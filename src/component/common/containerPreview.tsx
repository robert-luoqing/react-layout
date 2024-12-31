import { isNil, omitBy } from "lodash";
import { unitUtil } from "../../utils/unitUtil";
import { ContainerModel } from "./container";

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
      className="overflow-auto"
      style={{
        width: unitUtil.sizeParse(props.elementData?.width),
        height: unitUtil.sizeParse(props.elementData?.height),
        display: props.elementData?.display || "block",
        position: props.elementData?.position || "static",
        top: unitUtil.sizeParse(props.elementData?.top),
        left: unitUtil.sizeParse(props.elementData?.left),
        right: unitUtil.sizeParse(props.elementData?.right),
        bottom: unitUtil.sizeParse(props.elementData?.bottom),
      }}
    >
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="w-full h-full relative overflow-hidden"
          style={omitBy(innerStyle, isNil)}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};
