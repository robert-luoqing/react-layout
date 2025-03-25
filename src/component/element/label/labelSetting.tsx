import { useCallback } from "react";
import { ContainerSetting } from "../../common/containerSetting";
import { LabelModel } from "./labelDesign";
import { Input, Select } from "antd";

export interface LabelSettingProps {
  data: LabelModel;
  onChange: (key: string, value: any) => void;
  onDelete: () => void;
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
  const onSelectChange = useCallback(
    (tag: string, value: any) => {
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
        <div>
          <div className="font-bold text-[10px]">Vertical Align</div>
          <div>
            <Select
              className="w-full"
              value={props.data.verticalAlign}
              onChange={(val: string) => onSelectChange("verticalAlign", val)}
            >
              <option value="top">Top</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
            </Select>
          </div>
        </div>
        <div>
          <div className="font-bold text-[10px]">Text Align</div>
          <div>
            <Select
              className="w-full"
              value={props.data.textAlign}
              onChange={(val: string) => onSelectChange("textAlign", val)}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </Select>
          </div>
        </div>
      </ContainerSetting>
    </div>
  );
};
