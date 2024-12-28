import { useMemo, useRef } from "react";
import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/container";

export interface LabelModel extends ContainerModel {
  type: "Label";
  text?: string;
  fontSize?: string;
  fontWeight?: string;
  verticalAlign?: "top" | "center" | "bottom";
  textAlign?: "left" | "right" | "center";
}

export interface LabelProps extends ComponentProps {
  children?: undefined;
}
export const Label = (props: LabelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data as LabelModel;
  const alignItems = useMemo(() => {
    switch (data.verticalAlign) {
      case "bottom":
        return "flex-end";
      case "center":
        return "center";
      default:
        return "flex-start";
    }
  }, [data.verticalAlign]);
  const justifyContent = useMemo(()=> {
    switch (data.textAlign) {
      case "right":
        return "flex-end";
      case "center":
        return "center";
      default:
        return "flex-start";
    }
  }, [data.textAlign])

  return (
    <Container
      draggable={true}
      resize="both"
      {...{ ...props, children: undefined }}
      data={props.data}
    >
      <div
        ref={containerRef}
        className="w-full h-full flex flex-row"
        style={{
          fontSize: data?.fontSize,
          fontWeight: data?.fontWeight,
          justifyContent,
          alignItems,
        }}
      >
        {data?.text}
      </div>
    </Container>
  );
};
