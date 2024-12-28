import { unitUtil } from "../../utils/unitUtil";
import { ContainerModel } from "./container";

export interface ComponentPreviewProps {
  children?: React.ReactNode;
  elementData: ContainerModel;
  data: any;
  forData: Array<{ forItemName: string; forItemData: any }>;
}

export interface ContainerPreviewProps extends ComponentPreviewProps {
  noPadding?: boolean;
  noBorder?: boolean;
  noBackground?: boolean;
}

export const ContainerPreview = (props: ContainerPreviewProps) => {
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
          style={{
            padding: props.noPadding ? undefined : props.elementData?.padding,
            border: props.noBorder ? undefined : props.elementData?.border,
            background: props.noBackground
              ? undefined
              : props.elementData?.background,
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};
