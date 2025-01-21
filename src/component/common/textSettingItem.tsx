import { Input } from "antd";
import { useCallback } from "react";

export interface TextSettingItemProps {
  title: string;
  tag: string;
  value: any;
  type?: string;
  onChange: (tag: string, value: any) => void;
}
export const TextSettingItem = (props: TextSettingItemProps) => {
  const onTextChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      props.onChange(props.tag, value);
    },
    [props]
  );
  return (
    <div>
      <div className="font-bold text-[10px]">{props.title}</div>
      <div>
        <Input
          type={props.type || "text"}
          className="w-full"
          value={props.value}
          onChange={onTextChange}
        />
      </div>
    </div>
  );
};
