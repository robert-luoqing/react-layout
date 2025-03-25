import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/containerDesign";

export interface ImageModel extends ContainerModel {
  type: "Image";
  src?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
}

export interface ImageDesignProps extends ComponentProps {
  children?: undefined;
}
export const ImageDesign = (props: ImageDesignProps) => {
  const data = props.data as ImageModel;

  return (
    <Container
      draggable={true}
      resize="both"
      {...{ ...props, children: undefined }}
      data={props.data}
    >
      <img
        alt=""
        className="w-full h-full pointer-events-none"
        src={data.src}
        style={{ objectFit: data.objectFit }}
      />
    </Container>
  );
};
