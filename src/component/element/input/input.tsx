import { useRef } from "react";
import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/container";
import { Input as AntdInput } from "antd";

export interface InputModel extends ContainerModel {
  type: "Input";
  rawType?: string;
  text?: string;
  fontSize?: number;
  fontWeight?: string;
}

export interface InputProps extends ComponentProps {
  children?: undefined;
}
export const Input = (props: InputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data as InputModel;
  return (
    <Container
      draggable={true}
      resize="both"
      {...{ ...props, children: undefined }}
      data={props.data}
      noBorder={true}
      noBackground={true}
      noPadding={true}
    >
      <div ref={containerRef} className="w-full h-full relative">
        <AntdInput
          value={data?.text}
          className="w-full h-full"
          style={{
            fontSize: data?.fontSize,
            fontWeight: data?.fontWeight,
            padding: data?.padding,
            border: data?.border,
            background: data?.background,
          }}
        />
        <div className="absolute inset-0 bg-transparent"></div>
      </div>
    </Container>
  );
};
