import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/containerDesign";
import { Button as AntdButton } from "antd";
import { unitUtil } from "../../../utils/unitUtil";
import { isNil, omitBy } from "lodash";

export interface FuncModel {
  funcName?: string;
  funcParam1?: string;
  funcParam2?: string;
  funcParam3?: string;
  funcParam4?: string;
  resultPath?: string;
}

export interface ButtonDesignModel extends ContainerModel, FuncModel {
  type: "Button";
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  loadingWhenExec?: boolean;
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
