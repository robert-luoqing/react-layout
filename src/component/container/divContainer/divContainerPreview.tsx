import {
  ComponentPreviewProps,
  ContainerPreview,
} from "../../common/containerPreview";

export interface DivContainerPreviewProps extends ComponentPreviewProps {}
export const DivContainerPreview = (props: DivContainerPreviewProps) => {
  return (
    <ContainerPreview {...{ ...props, children: undefined }} elementData={props.elementData}>
      <div className="w-full h-full">{props.children}</div>
    </ContainerPreview>
  );
};
