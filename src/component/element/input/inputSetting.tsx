import { useCallback } from "react";
import { ContainerSetting } from "../../common/containerSetting";
import { InputModel } from "./inputDesign";
import { Input } from "antd";

export interface InputSettingProps {
  data: InputModel;
  onChange: (key: string, value: any) => void;
  onDelete: () => void;
}

export const InputSetting = (props: InputSettingProps) => {
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
      <ContainerSetting
        data={props.data}
        onChange={props.onChange}
        onDelete={props.onDelete}
      >
        <div>
          <div className="font-bold text-[10px]">Type</div>
          <div>
            <Input
              type="text"
              className="w-full"
              data-tag="rawType"
              value={props.data.rawType}
              onChange={onTextChange}
            />
          </div>
        </div>
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
      </ContainerSetting>
    </div>
  );
};
