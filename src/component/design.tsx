import React, { useEffect, useMemo, useState } from "react";
import { DivContainerModel } from "../component/container/divContainer/divContainer";
import { v4 as uuidv4 } from "uuid";
import { PositionModel } from "../models/positionModel";
import { ContainerModel } from "../component/common/container";
import { arrayUtil } from "../utils/arrayUtil";
import { Modal } from "antd";
import { Preview } from "../component/preview";
import { useDesignComponents } from "../hoc/designComponentHoc";

function replaceData(
  oldData: any,
  newData: any,
  parentData: any,
  rootElement: any
) {
  if (parentData) {
    for (let index = 0; index < parentData.children?.length; index++) {
      const item = parentData.children[index];
      if (item.id === oldData.id) {
        parentData.children[index] = newData;
        break;
      }
    }

    return { ...rootElement };
  } else {
    return newData;
  }
}

function getSelectedDataById(
  rootElement: Partial<{ id: string; children?: any[] }>,
  id: string
): any | null {
  if (rootElement) {
    if (rootElement.id === id) {
      return rootElement;
    }
    if (rootElement.children) {
      for (const child of rootElement.children) {
        const result = getSelectedDataById(child, id);
        if (result) {
          return result;
        }
      }
    }
  }

  return null;
}

export const Design = () => {
  const { components: uiElements, componentsMap: uiElementsMap } =
    useDesignComponents();

  const [rootElement, setRootElement] = useState<any>(null);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [dragData, setDragData] = useState<{
    data: any;
    position: PositionModel;
    parentData: any;
  } | null>(null);

  useEffect(() => {
    const newRootElement: DivContainerModel = {
      id: uuidv4(),
      type: "DivContainer",
      width: 1200,
      height: 800,
      border: "1px solid gray",
      padding: "16px",
      children: [],
    };

    setRootElement(newRootElement);
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
    setRootElement(replaceData(data, newData, parentData, rootElement));
  };

  const onClick = (data: any) => {
    // Only select one item in this time
    if (selectedItemIds.length > 0 && selectedItemIds[0] === data.id) {
      setSelectedItemIds([]);
    } else {
      if (data.id !== rootElement.id) {
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

      setRootElement({ ...rootElement });
    } else {
      const droppedData = event.dataTransfer.getData("text/plain");
      if (droppedData) {
        const droppedObj = JSON.parse(droppedData);
        droppedObj.left = position.self.x;
        droppedObj.top = position.self.y;
        const dropObj: ContainerModel = data;
        dropObj.children = [...(dropObj.children || []), droppedObj];
        setRootElement({ ...rootElement });
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
          draggable={rootElement === data ? false : true}
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
    return getSelectedDataById(rootElement, selectedItemIds[0]);
  }, [rootElement, selectedItemIds]);

  const onSelectedDataChanged = (key: string, value: any) => {
    selectedData[key] = value;
    setRootElement({ ...rootElement });
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

  const renderButtons = () => {
    return uiElements.map((item) => (
      <div key={item.name}>
        <item.buttonComponent />
      </div>
    ));
  };

  const [testData] = useState<any>({
    userName: "robert",
    users: [{ name: "Robert" }, { name: "Chris" }],
  });

  const [localFuncs] = useState({
    test: async (context: any, param: any) => {
      return new Promise<any>((fulfill) => {
        setTimeout(() => {
          fulfill({ order: { name: "test"+ param.funcParam1} });
        }, 1000);
      });
    },
  });

  return (
    <div className="w-full h-full">
      <div className="flex flex-row items-center w-full h-full">
        <div className="w-[200px] h-full border-r-[1px] border-solid border-l-gray-400 p-[16px] flex flex-col gap-[8px]">
          {renderButtons()}
        </div>
        <div className="flex-1 w-0 flex flex-col items-center h-full justify-center">
          <div>{renderByData(rootElement, null)}</div>
          <div className="flex flex-col items-end py-2">
            <button onClick={() => setShowPreview(true)}>Preview</button>
          </div>
        </div>
        <div className="w-[300px] h-full border-l-[1px] border-solid border-l-gray-400 p-[16px] flex flex-col gap-[8px] overflow-auto">
          <div>{renderSetting()}</div>
        </div>
      </div>
      {showPreview && (
        <Modal
          open={true}
          width={rootElement.width}
          onClose={() => setShowPreview(false)}
          onCancel={() => setShowPreview(false)}
          onOk={() => setShowPreview(false)}
        >
          <div className="pt-[30px]">
            <Preview
              elementData={{ ...rootElement, border: undefined }}
              initializeData={testData}
              dataLoadPolicy="LoadOnce"
              localFuncs={localFuncs}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
