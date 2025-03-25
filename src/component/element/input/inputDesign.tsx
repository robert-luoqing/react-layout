import { useRef } from "react";
import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/containerDesign";
import { Input as AntdInput } from "antd";
import { unitUtil } from "../../../utils/unitUtil";
import { isNil, omitBy } from "lodash";

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
export const InputDesign = (props: InputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data as InputModel;
  const containerData = {
    ...data,
    border: undefined,
    borderLeft: undefined,
    borderRight: undefined,
    borderTop: undefined,
    borderBottom: undefined,
    padding: undefined,
    background: undefined,
    borderRadius: undefined,
  };
  const innerStyle = {
    fontSize: data?.fontSize,
    fontWeight: data?.fontWeight,
    padding: data?.padding,
    border: data?.border,

    borderLeft: data?.borderLeft,
    borderRight: data?.borderRight,
    borderTop: data?.borderTop,
    borderBottom: data?.borderBottom,
    background: data?.background,
    borderRadius: unitUtil.sizeParse(data?.borderRadius),
  };
  return (
    <Container
      draggable={true}
      resize="both"
      {...{ ...props, children: undefined }}
      data={containerData}
      rawData={props.rawData}
    >
      <div ref={containerRef} className="w-full h-full relative">
        <AntdInput value={data?.text} className="w-full h-full" style={omitBy(innerStyle, isNil)} />
        <div className="absolute inset-0 bg-transparent"></div>
      </div>
    </Container>
  );
};
