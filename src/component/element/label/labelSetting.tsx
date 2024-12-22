import { useCallback } from "react";
import { ContainerSetting } from "../../common/containerSetting";
import { LabelModel } from "./label";
import { Input } from "antd";

export interface LabelSettingProps {
  data: LabelModel;
  onChange: (key: string, value: any) => void;
}

export const LabelSetting = (props: LabelSettingProps) => {
  const onTextChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      const tag = event.target.getAttribute("data-tag");
      props.onChange(tag, value);
    },
    [props]
  );
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="font-bold text-[10px]">Text</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="text"
            value={props.data.text}
            onChange={onTextChange}
          />
        </div>
      </div>
      <ContainerSetting data={props.data} onChange={props.onChange} />
    </div>
  );
};
