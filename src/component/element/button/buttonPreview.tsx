import { useMemo, useRef } from "react";
import { Button as AntdButton } from "antd";
import {
  ComponentPreviewProps,
  ContainerPreview,
} from "../../common/containerPreview";
import { objUtil } from "../../../utils/objUtil";
import { unitUtil } from "../../../utils/unitUtil";
import { isNil, omitBy } from "lodash";
import { ButtonDesignModel } from "./buttonDesign";

export interface ButtonPreviewProps extends ComponentPreviewProps {
  children?: undefined;
  onClick?: () => void;
}
export const ButtonPreview = (props: ButtonPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementData = props.elementData as ButtonDesignModel;
  const value = useMemo(() => {
    return objUtil.formatFromDataAndForData(
      elementData?.text,
      props.data,
      props.forData
    );
  }, [elementData?.text, props.data, props.forData]);
  const containerElementData = useMemo(() => {
    return {
      ...elementData,
      border: undefined,
      borderLeft: undefined,
      borderRight: undefined,
      borderTop: undefined,
      borderBottom: undefined,
      padding: undefined,
      background: undefined,
      borderRadius: undefined,
    };
  }, [elementData]);
  const innerStyle = {
    fontSize: elementData?.fontSize,
    fontWeight: elementData?.fontWeight,
    padding: elementData?.padding,
    border: elementData?.border,
    borderLeft: elementData?.borderLeft,
    borderRight: elementData?.borderRight,
    borderTop: elementData?.borderTop,
    borderBottom: elementData?.borderBottom,
    background: elementData?.background,
    borderRadius: unitUtil.sizeParse(elementData?.borderRadius),
  };
  return (
    <ContainerPreview
      {...{ ...props, children: undefined }}
      elementData={containerElementData}
      rawElementData={props.rawElementData}
    >
      <div ref={containerRef} className="w-full h-full">
        <AntdButton className="w-full h-full" style={omitBy(innerStyle, isNil)} onClick={props.onClick}>
          {value || ""}
        </AntdButton>
      </div>
    </ContainerPreview>
  );
};
