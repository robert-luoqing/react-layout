import { useMemo, useRef } from "react";
import {
  ComponentPreviewProps,
  ContainerPreview,
} from "../../common/containerPreview";
import { LabelModel } from "./labelDesign";
import { objUtil } from "../../../utils/objUtil";

export interface LabelPreviewProps extends ComponentPreviewProps {
  children?: undefined;
}
export const LabelPreview = (props: LabelPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementData = props.elementData as LabelModel;
  const alignItems = useMemo(() => {
    switch (elementData.verticalAlign) {
      case "bottom":
        return "flex-end";
      case "center":
        return "center";
      default:
        return "flex-start";
    }
  }, [elementData.verticalAlign]);
  const justifyContent = useMemo(() => {
    switch (elementData.textAlign) {
      case "right":
        return "flex-end";
      case "center":
        return "center";
      default:
        return "flex-start";
    }
  }, [elementData.textAlign]);

  const value = useMemo(() => {
    return objUtil.formatFromDataAndForData(
      elementData?.text,
      props.data,
      props.forData
    );
  }, [elementData?.text, props.data, props.forData]);
  return (
    <ContainerPreview
      {...{ ...props, children: undefined }}
      elementData={props.elementData}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          fontSize: elementData?.fontSize,
          fontWeight: elementData?.fontWeight,
          justifyContent,
          alignItems,
        }}
      >
        {value}
      </div>
    </ContainerPreview>
  );
};
