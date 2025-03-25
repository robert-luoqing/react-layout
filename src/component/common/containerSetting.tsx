import { useCallback } from "react";
import { Button, Select } from "antd";
import { ContainerModel } from "./containerDesign";
import { TextSettingItem } from "./items/textSettingItem";
import { ExpandSetting } from "./expandSetting";
import { CheckboxSettingItem } from "./items/checkboxSettingItem";

export interface ContainerSettingProps {
  data: ContainerModel;
  onChange: (key: string, value: any) => void;
  children?: React.ReactNode;
  onDelete: () => void;
}

export const ContainerSetting = (props: ContainerSettingProps) => {
  const onSelectChange = useCallback(
    (tag: string, value: any) => {
      props.onChange(tag, value);
    },
    [props]
  );
  return (
    <div className="flex flex-col gap-2">
      <TextSettingItem
        title="Id"
        tag="id"
        value={props.data.id}
        onChange={props.onChange}
      />
      {props.children}
      <TextSettingItem
        title="Background"
        tag="background"
        value={props.data.background}
        onChange={props.onChange}
      />

      <ExpandSetting title="Border Setting">
        <div className="border-b-[1px] border-gray-400 border-solid pb-2">
          <TextSettingItem
            title="Border"
            tag="border"
            value={props.data.border}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Border Top"
            tag="borderTop"
            value={props.data.borderTop}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Border Right"
            tag="borderRight"
            value={props.data.borderRight}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Border Bottom"
            tag="borderBottom"
            value={props.data.borderBottom}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Border Left"
            tag="borderLeft"
            value={props.data.borderLeft}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Border Radius"
            tag="borderRadius"
            value={props.data.borderRadius}
            onChange={props.onChange}
          />
        </div>
      </ExpandSetting>
      <ExpandSetting title="Position Setting">
        <div className="border-b-[1px] border-gray-400 border-solid pb-2">
          <TextSettingItem
            title="Width"
            tag="width"
            value={props.data.width}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Height"
            tag="height"
            value={props.data.height}
            onChange={props.onChange}
          />
          <div>
            <div className="font-bold text-[10px]">Position</div>
            <div>
              <Select
                className="w-full"
                value={props.data.position}
                onChange={(val: string) => onSelectChange("position", val)}
              >
                <option value="static">Static</option>
                <option value="absolute">Absolute</option>
              </Select>
            </div>
          </div>
          {props.data.position === "absolute" && (
            <div>
              <TextSettingItem
                title="Top"
                tag="top"
                value={props.data.top}
                onChange={props.onChange}
              />
              <TextSettingItem
                title="Right"
                tag="right"
                value={props.data.right}
                onChange={props.onChange}
              />
              <TextSettingItem
                title="Bottom"
                tag="bottom"
                value={props.data.bottom}
                onChange={props.onChange}
              />
              <TextSettingItem
                title="Left"
                tag="left"
                value={props.data.left}
                onChange={props.onChange}
              />
            </div>
          )}

          <div>
            <div className="font-bold text-[10px]">Display</div>
            <div>
              <Select
                className="w-full"
                value={props.data.display}
                onChange={(val: string) => onSelectChange("display", val)}
              >
                <option value="block">Block</option>
                <option value="inline-block">Inline Block</option>
              </Select>
            </div>
          </div>
          <TextSettingItem
            title="Padding"
            tag="padding"
            value={props.data.padding}
            onChange={props.onChange}
          />
        </div>
      </ExpandSetting>
      <ExpandSetting title="Control Setting">
        <div className="pb-2">
          <TextSettingItem
            title="For Path"
            tag="forPath"
            value={props.data.forPath}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="For Item Name"
            tag="forItemName"
            value={props.data.forItemName}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="If Condition"
            tag="if"
            value={props.data.if}
            onChange={props.onChange}
          />
        </div>
      </ExpandSetting>
      <TextSettingItem
        title="zIndex"
        tag="zIndex"
        value={props.data.zIndex}
        onChange={props.onChange}
      />
      <CheckboxSettingItem
        title="Frozen"
        tag="frozen"
        value={props.data.frozen}
        onChange={props.onChange}
      />
      <div>
        <Button className="w-full" danger={true} onClick={props.onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
