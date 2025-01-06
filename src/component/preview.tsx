import { ContainerModel } from "./common/container";
import { useState } from "react";
import { objUtil } from "../utils/objUtil";
import { isNil } from "lodash";
import { funcUtil } from "../utils/funcUtil";
import { usePreviewComponents } from "../hoc/previewComponentHoc";

export interface PreviewProps {
  elementData: ContainerModel;
}

export const Preview = (props: PreviewProps) => {
  const { componentsMap: uiElementsMap } = usePreviewComponents();

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
    if (elementData.if) {
      const context = { ...data };
      for (const item of forData) {
        context[item.forItemName] = item.forItemData;
      }
      const result = funcUtil.evaluateCondition(elementData.if, context);
      if (!result) {
        return null;
      }
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
    const PreviewElement = uiElementsMap[elementData.type]?.previewComponent;
    if (PreviewElement) {
      return (
        <PreviewElement
          key={elementData.id + "-" + index}
          rawElementData={elementData}
          elementData={elementData}
          data={data}
          forData={[...forData]}
          onChange={onInputChange}
        >
          {elementData.children?.map((item: any) =>
            renderByData(item, forData)
          )}
        </PreviewElement>
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
