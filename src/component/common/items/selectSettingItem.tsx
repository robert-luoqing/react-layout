import { Select } from "antd";
import { useCallback } from "react";

export interface SelectSettingItemProps {
  title: string;
  tag: string;
  value: any;
  type?: string;
  onChange: (tag: string, value: any) => void;
  items: Array<{
    value: string;
    label: string;
  }>;
}
export const SelectSettingItem = (props: SelectSettingItemProps) => {
  const onSelectChange = useCallback(
    (value: any) => {
      props.onChange(props.tag, value);
    },
    [props]
  );

  return (
    <div>
      <div className="font-bold text-[10px]">{props.title}</div>
      <div>
        <Select
          className="w-full"
          value={props.value}
          onChange={onSelectChange}
        >
          {(props.items || []).map((item) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </Select>
      </div>
    </div>
  );
};
