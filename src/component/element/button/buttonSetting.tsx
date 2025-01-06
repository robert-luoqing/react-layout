import { useCallback } from "react";
import { ContainerSetting } from "../../common/containerSetting";

import { Input } from "antd";
import { ButtonDesignModel } from "./buttonDesign";

export interface ButtonSettingProps {
  data: ButtonDesignModel;
  onChange: (key: string, value: any) => void;
}

export const ButtonSetting = (props: ButtonSettingProps) => {
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
      <div>
        <div className="font-bold text-[10px]">Font Size</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="fontSize"
            value={props.data.fontSize}
            onChange={onTextChange}
          />
        </div>
      </div>
      <div>
        <div className="font-bold text-[10px]">Font Weight</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="fontWeight"
            value={props.data.fontWeight}
            onChange={onTextChange}
          />
        </div>
      </div>

      <ContainerSetting data={props.data} onChange={props.onChange} />
    </div>
  );
};