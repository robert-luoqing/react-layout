import {
  ComponentPreviewProps,
  ContainerPreview,
} from "../../common/containerPreview";
import { VerticalLineModel } from "./verticalLineDesign";
import { unitUtil } from "../../../utils/unitUtil";

export interface VerticalLinePreviewProps extends ComponentPreviewProps {
  children?: undefined;
}
export const VerticalLinePreview = (props: VerticalLinePreviewProps) => {
  const elementData = props.elementData as VerticalLineModel;

  return (
    <ContainerPreview
      {...{ ...props, children: undefined }}
      elementData={props.elementData}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: elementData.lineColor || "grey",
          width: unitUtil.sizeParse(elementData.lineWidth || 1),
        }}
      ></div>
    </ContainerPreview>
  );
};
