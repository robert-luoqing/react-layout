import { ContainerModel } from "./common/container";
import { DivContainerPreview } from "./container/divContainer/divContainerPreview";
import { LabelPreview } from "./element/label/labelPreview";
import { InputPreview } from "./element/input/inputPreview";
import { useState } from "react";
import { objUtil } from "../utils/objUtil";
import { isNil } from "lodash";

export interface PreviewProps {
  elementData: ContainerModel;
}

export const Preview = (props: PreviewProps) => {
  const [data, setData] = useState<any>({
    userName: "robert",
    users: [{ name: "Robert" }, { name: "Chris" }],
  });
  const onInputChange = (
    val: string,
    path: string | undefined,
    data: any,
    forData: Array<{ forItemName: string; forItemData: any }>
  ) => {
    if (path) {
      const newPath = path.trim();
      if (newPath.startsWith("{") && newPath.endsWith("}")) {
        const realPath = newPath.substring(1, newPath.length - 1);
        const targetObj = objUtil.getTargetObjForProps(data, forData, realPath);
        if (targetObj === data) {
          const newData = objUtil.setProp(targetObj, realPath, val);
          setData({ ...newData });
        } else {
          // TODO 如果处理绑定For对象本身呢
          objUtil.setProp(targetObj, realPath, val);
          setData({ ...data });
        }
      }
    }
  };

  const renderByData = (
    elementData: any,
    forData: Array<{ forItemName: string; forItemData: any }>
  ) => {
    if (!elementData) {
      return null;
    }
    if (elementData.forPath && elementData.forItemName) {
      const forListData = objUtil.getPropFromDataAndForData(
        data,
        forData,
        elementData.forPath
      );
      if (isNil(forListData) || !forListData.map) {
        return null;
      }

      return forListData.map((item: any, index: number) => {
        const newForData = [
          ...forData,
          { forItemName: elementData.forItemName, forItemData: item },
        ];
        return renderElement(elementData, newForData, index);
      });
    }

    return renderElement(elementData, forData);
  };

  const renderElement = (
    elementData: any,
    forData: Array<{ forItemName: string; forItemData: any }>,
    index?: number
  ) => {
    switch (elementData.type) {
      case "DivContainer":
        return (
          <DivContainerPreview
            key={elementData.id + "-" + index}
            elementData={elementData}
            data={data}
            forData={[...forData]}
          >
            {elementData.children?.map((item: any) =>
              renderByData(item, forData)
            )}
          </DivContainerPreview>
        );
      case "Label":
        return (
          <LabelPreview
            key={elementData.id + "-" + index}
            elementData={elementData}
            data={data}
            forData={[...forData]}
          />
        );
      case "Input":
        return (
          <InputPreview
            key={elementData.id + "-" + index}
            elementData={elementData}
            data={data}
            forData={[...forData]}
            onChange={onInputChange}
          />
        );
    }

    return null;
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-row items-center w-full h-full">
        <div className="flex-1 w-0 flex flex-col items-center h-full justify-center">
          {renderByData(props.elementData, [])}
        </div>
      </div>
    </div>
  );
};
