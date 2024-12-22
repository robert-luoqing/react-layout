import { useRef } from "react";
import { Container, ContainerModel, ComponentProps } from "../../common/container";

export interface LabelModel extends ContainerModel {
  type: "Label";
  text: string;
  fontSize: number;
  fontWeight: string;
}

export interface LabelProps extends ComponentProps {
  children?: undefined;
}
export const Label = (props: LabelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data as LabelModel;

  return (
    <Container
      draggable={true}
      resize="both"
      {...{ ...props, children: undefined }}
      data={props.data}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{
          fontSize: data?.fontSize,
          fontWeight: data?.fontWeight,
        }}
      >
        {data?.text}
      </div>
    </Container>
  );
};
