import {
  ComponentPreviewProps,
  ContainerPreview,
} from "../../common/containerPreview";

export interface DivContainerPreviewProps extends ComponentPreviewProps {}
export const DivContainerPreview = (props: DivContainerPreviewProps) => {
  return (
    <ContainerPreview
      {...{ ...props, children: undefined }}
      elementData={props.elementData}
    >
      <div style={{ width: "100%", height: "100%" }}>{props.children}</div>
    </ContainerPreview>
  );
};
