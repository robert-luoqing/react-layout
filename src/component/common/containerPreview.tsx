import { isNil, omitBy } from "lodash";
import { unitUtil } from "../../utils/unitUtil";
import { ContainerModel } from "./containerDesign";

export interface ComponentPreviewProps {
  children?: React.ReactNode;
  rawElementData: ContainerModel;
  elementData: ContainerModel;
  data: any;
  forData: Array<{ forItemName: string; forItemData: any }>;
}

export interface ContainerPreviewProps extends ComponentPreviewProps {}

export const ContainerPreview = (props: ContainerPreviewProps) => {
  const innerStyle = {
    padding: props.elementData?.padding,
    border: props.elementData?.border,
    borderLeft: props.elementData?.borderLeft,
    borderRight: props.elementData?.borderRight,
    borderTop: props.elementData?.borderTop,
    borderBottom: props.elementData?.borderBottom,
    background: props.elementData?.background,
    borderRadius: unitUtil.sizeParse(props.elementData?.borderRadius),
  };

  return (
    <div
      style={{
        overflow: "auto",
        width: unitUtil.sizeParse(props.elementData?.width),
        height: unitUtil.sizeParse(props.elementData?.height),
        display: props.elementData?.display || "block",
        position: props.elementData?.position || "static",
        top: unitUtil.sizeParse(props.elementData?.top),
        left: unitUtil.sizeParse(props.elementData?.left),
        right: unitUtil.sizeParse(props.elementData?.right),
        bottom: unitUtil.sizeParse(props.elementData?.bottom),
        zIndex: props.elementData.zIndex,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            ...omitBy(innerStyle, isNil),
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};
