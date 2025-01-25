import { Checkbox } from "antd";
import { useCallback } from "react";

export interface CheckboxSettingItemProps {
  title: string;
  tag: string;
  value: any;
  type?: string;
  onChange: (tag: string, value: any) => void;
}
export const CheckboxSettingItem = (props: CheckboxSettingItemProps) => {
  const onCheckboxChange = useCallback(
    (event: any) => {
      const value = event.target.checked;
      props.onChange(props.tag, value);
    },
    [props]
  );

  return (
    <div>
      <div className="font-bold text-[10px]">{props.title}</div>
      <div>
        <Checkbox value={props.value} onChange={onCheckboxChange} />
      </div>
    </div>
  );
};
