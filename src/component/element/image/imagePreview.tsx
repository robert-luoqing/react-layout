import { useMemo } from "react";
import {
  ComponentPreviewProps,
  ContainerPreview,
} from "../../common/containerPreview";
import { ImageModel } from "./imageDesign";
import { objUtil } from "../../../utils/objUtil";

export interface ImagePreviewProps extends ComponentPreviewProps {
  children?: undefined;
}
export const ImagePreview = (props: ImagePreviewProps) => {
  const elementData = props.elementData as ImageModel;

  const src = useMemo(() => {
    return objUtil.formatFromDataAndForData(
      elementData?.src,
      props.data,
      props.forData
    );
  }, [elementData?.src, props.data, props.forData]);
  return (
    <ContainerPreview
      {...{ ...props, children: undefined }}
      elementData={props.elementData}
    >
      <img
        alt=""
        src={src || ""}
        style={{
          width: "100%",
          height: "100%",
          objectFit: elementData.objectFit,
        }}
      />
    </ContainerPreview>
  );
};
