import { useMemo, useRef } from "react";
import { Input as AntdInput } from "antd";
import {
  ComponentPreviewProps,
  ContainerPreview,
} from "../../common/containerPreview";
import { InputModel } from "./input";
import { objUtil } from "../../../utils/objUtil";

export interface InputPreviewProps extends ComponentPreviewProps {
  children?: undefined;
  onChange: (
    val: string,
    path: string | undefined,
    data: any,
    forData: Array<{ forItemName: string; forItemData: any }>
  ) => void;
}
export const InputPreview = (props: InputPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementData = props.elementData as InputModel;
  const value = useMemo(() => {
    return objUtil.formatFromDataAndForData(
      elementData?.text,
      props.data,
      props.forData
    );
  }, [elementData?.text, props.data, props.forData]);

  return (
    <ContainerPreview
      {...{ ...props, children: undefined }}
      elementData={props.elementData}
      noBorder={true}
      noBackground={true}
      noPadding={true}
    >
      <div ref={containerRef} className="w-full h-full">
        <AntdInput
          value={value || ""}
          className="w-full h-full"
          type={elementData.rawType}
          style={{
            fontSize: elementData?.fontSize,
            fontWeight: elementData?.fontWeight,
            padding: elementData?.padding,
            border: elementData?.border,
            background: elementData?.background,
          }}
          onChange={(e) =>
            props.onChange(
              e.target.value,
              elementData?.text,
              props.data,
              props.forData
            )
          }
        />
      </div>
    </ContainerPreview>
  );
};
