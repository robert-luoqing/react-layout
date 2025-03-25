import {
  ComponentPreviewProps,
  ContainerPreview,
} from "../../common/containerPreview";
import { HorizontalLineModel } from "./horizontalLineDesign";
import { unitUtil } from "../../../utils/unitUtil";

export interface HorizontalLinePreviewProps extends ComponentPreviewProps {
  children?: undefined;
}
export const HorizontalLinePreview = (props: HorizontalLinePreviewProps) => {
  const elementData = props.elementData as HorizontalLineModel;

  return (
    <ContainerPreview
      {...{ ...props, children: undefined }}
      elementData={props.elementData}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: elementData.lineColor || "grey",
          height: unitUtil.sizeParse(elementData.lineHeight || 1),
        }}
      ></div>
    </ContainerPreview>
  );
};
