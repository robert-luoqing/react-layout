import React, { useEffect, useMemo, useState } from "react";
import {
  DivContainer,
  DivContainerModel,
} from "./component/container/divContainer/divContainer";
import { v4 as uuidv4 } from "uuid";
import { PositionModel } from "./models/positionModel";
import { ContainerModel } from "./component/common/container";
import { arrayUtil } from "./utils/arrayUtil";
import { Label } from "./component/element/label/label";
import { LabelButton } from "./component/element/label/labelButton";
import { DivContainerButton } from "./component/container/divContainer/divContainerButton";
import { DivContainerSetting } from "./component/container/divContainer/divContainerSetting";
import { LabelSetting } from "./component/element/label/labelSetting";
import { Input } from "./component/element/input/input";
import { InputSetting } from "./component/element/input/inputSetting";
import { InputButton } from "./component/element/input/inputButton";
import { Modal } from "antd";
import { Preview } from "./component/preview";
import { DivContainerPreview } from "./component/container/divContainer/divContainerPreview";
import { LabelPreview } from "./component/element/label/labelPreview";
import { InputPreview } from "./component/element/input/inputPreview";
import { UIElement } from "./models/UIElement";

export const uiElements: UIElement[] = [];
export const uiElementsMap: { [name: string]: UIElement } = {};

function registerComponent(
  name: string,
  designComponent: any,
  settingComponent: any,
  previewComponent: any,
  buttonComponent: any
) {
  const componentInfo = {
    name,
    designComponent,
    settingComponent,
    previewComponent,
    buttonComponent,
  };
  uiElements.push(componentInfo);
  uiElementsMap[name] = componentInfo;
}

registerComponent(
  "DivContainer",
  DivContainer,
  DivContainerSetting,
  DivContainerPreview,
  DivContainerButton
);
registerComponent("Label", Label, LabelSetting, LabelPreview, LabelButton);
registerComponent("Input", Input, InputSetting, InputPreview, InputButton);

function replaceData(
  oldData: any,
  newData: any,
  parentData: any,
  rootData: any
) {
  if (parentData) {
    for (let index = 0; index < parentData.children?.length; index++) {
      const item = parentData.children[index];
      if (item.id === oldData.id) {
        parentData.children[index] = newData;
        break;
      }
    }

    return { ...rootData };
  } else {
    return newData;
  }
}

function getSelectedDataById(
  rootData: Partial<{ id: string; children?: any[] }>,
  id: string
): any | null {
  if (rootData) {
    if (rootData.id === id) {
      return rootData;
    }
    if (rootData.children) {
      for (const child of rootData.children) {
        const result = getSelectedDataById(child, id);
        if (result) {
          return result;
        }
      }
    }
  }

  return null;
}

const App = () => {
  const [rootData, setRootData] = useState<any>(null);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [dragData, setDragData] = useState<{
    data: any;
    position: PositionModel;
    parentData: any;
  } | null>(null);

  useEffect(() => {
    const newRootData: DivContainerModel = {
      id: uuidv4(),
      type: "DivContainer",
      width: 1200,
      height: 800,
      border: "1px solid gray",
      padding: "16px",
      children: [],
    };

    setRootData(newRootData);
  }, []);

  const onSizeChanged = (
    data: any,
    event: {
      width: number | undefined;
      height: number | undefined;
    },
    parentData: any
  ) => {
    const newSize: any = { ...(data.size || {}) };
    if (event.width !== undefined) {
      newSize.width = event.width;
    }
    if (event.height !== undefined) {
      newSize.height = event.height;
    }
    const newData = { ...data, ...newSize };
    setRootData(replaceData(data, newData, parentData, rootData));
  };

  const onClick = (data: any) => {
    // Only select one item in this time
    if (selectedItemIds.length > 0 && selectedItemIds[0] === data.id) {
      setSelectedItemIds([]);
    } else {
      if (data.id !== rootData.id) {
        setSelectedItemIds([data.id]);
      }
    }
  };

  const onDragStart = (data: any, position: PositionModel, parentData: any) => {
    setDragData({ position, data, parentData });
  };
  const onDragEnd = (data: any, position: PositionModel, parentData: any) => {
    setDragData(null);
  };
  const onDrop = (
    data: any,
    position: PositionModel,
    parentData: any,
    event: any
  ) => {
    if (dragData) {
      setDragData(null);
      if (dragData === data) {
        return;
      }

      const target = event.target;
      const paddingLeft = target.offsetLeft - target.clientLeft;
      const paddingTop = target.offsetTop - target.clientTop;

      const newX = position.self.x - dragData.position.self.x;
      const newY = position.self.y - dragData.position.self.y;
      const dragObj: ContainerModel = dragData.data;
      const dragParentObj: ContainerModel = dragData.parentData;
      const dropObj: ContainerModel = data;
      const newDragObj = { ...dragObj };
      arrayUtil.removeItemByFilter(
        dragParentObj?.children || [],
        (item: any) => dragObj.id === item.id
      );
      if (dragObj.position === "absolute") {
        newDragObj.top = newY + paddingTop;
        newDragObj.left = newX + paddingLeft;
        newDragObj.bottom = undefined;
        newDragObj.right = undefined;
        dropObj.children = [...(dropObj.children || []), newDragObj];
      } else {
        dropObj.children = [...(dropObj.children || []), newDragObj];
      }

      setRootData({ ...rootData });
    } else {
      const droppedData = event.dataTransfer.getData("text/plain");
      if (droppedData) {
        const droppedObj = JSON.parse(droppedData);
        droppedObj.left = position.self.x;
        droppedObj.top = position.self.y;
        const dropObj: ContainerModel = data;
        dropObj.children = [...(dropObj.children || []), droppedObj];
        setRootData({ ...rootData });
        setSelectedItemIds([droppedObj.id]);
      }
    }
  };

  const renderByData = (data: any, parentData: any) => {
    if (!data) {
      return null;
    }
    const componentInfo = uiElementsMap[data.type];
    if (componentInfo) {
      const DesignComponent = componentInfo.designComponent;
      return (
        <DesignComponent
          key={data.id}
          data={data}
          rawData={data}
          parentData={parentData}
          selected={selectedItemIds.includes(data.id)}
          draggable={rootData === data ? false : true}
          onSizeChanged={onSizeChanged}
          onClick={onClick}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
        >
          {data.children?.map((item: any) => renderByData(item, data))}
        </DesignComponent>
      );
    }

    return null;
  };

  const selectedData = useMemo(() => {
    if (selectedItemIds.length === 0) {
      return null;
    }
    return getSelectedDataById(rootData, selectedItemIds[0]);
  }, [rootData, selectedItemIds]);

  const onSelectedDataChanged = (key: string, value: any) => {
    selectedData[key] = value;
    setRootData({ ...rootData });
  };

  const [showPreview, setShowPreview] = useState(false);

  const renderSetting = () => {
    if (!!selectedData && uiElementsMap[selectedData.type]) {
      const SettingComponent =
        uiElementsMap[selectedData.type].settingComponent;
      return (
        <SettingComponent
          data={selectedData}
          onChange={onSelectedDataChanged}
        />
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-row items-center w-full h-full">
        <div className="flex-1 w-0 flex flex-col items-center h-full justify-center">
          <div>{renderByData(rootData, null)}</div>
          <div className="flex flex-col items-end py-2">
            <button onClick={() => setShowPreview(true)}>Preview</button>
          </div>
        </div>
        <div className="w-[300px] h-full border-l-[1px] border-solid border-l-gray-400 p-[16px] flex flex-col gap-[8px]">
          {uiElements.map((item) => (
            <div key={item.name}>
              <item.buttonComponent />
            </div>
          ))}
          <div>{renderSetting()}</div>
        </div>
      </div>
      {showPreview && (
        <Modal
          open={true}
          width={rootData.width}
          onClose={() => setShowPreview(false)}
          onCancel={() => setShowPreview(false)}
          onOk={() => setShowPreview(false)}
        >
          <div className="pt-[30px]">
            <Preview
              elementData={{ ...rootData, border: undefined }}
              uiElements={uiElements}
              uiElementsMap={uiElementsMap}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
