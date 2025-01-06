import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/container";
import { Button as AntdButton } from "antd";
import { unitUtil } from "../../../utils/unitUtil";
import { isNil, omitBy } from "lodash";

export interface ButtonDesignModel extends ContainerModel {
  type: "Button";
  text?: string;
  fontSize?: number;
  fontWeight?: string;
}

export interface ButtonDesignProps extends ComponentProps {
  children?: undefined;
}
export const ButtonDesign = (props: ButtonDesignProps) => {
  const data = props.data as ButtonDesignModel;
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
      <div className="w-full h-full relative">
        <AntdButton className="w-full h-full" style={omitBy(innerStyle, isNil)}>
          {data?.text}
        </AntdButton>
        <div className="absolute inset-0 bg-transparent"></div>
      </div>
    </Container>
  );
};
