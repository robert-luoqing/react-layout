import { useCallback } from "react";
import { ContainerSetting } from "../../common/containerSetting";
import { ImageModel } from "./imageDesign";
import { Input, Select } from "antd";
import { TextSettingItem } from "../../common/items/textSettingItem";
import { SelectSettingItem } from "../../common/items/selectSettingItem";

export interface ImageSettingProps {
  data: ImageModel;
  onChange: (key: string, value: any) => void;
  onDelete: () => void;
}

export const ImageSetting = (props: ImageSettingProps) => {
  return (
    <div className="flex flex-col gap-2">
      <ContainerSetting
        data={props.data}
        onChange={props.onChange}
        onDelete={props.onDelete}
      >
        <TextSettingItem
          title="Image Url"
          tag="src"
          value={props.data.src}
          onChange={props.onChange}
        />

        <SelectSettingItem
          title="Object Fit"
          tag="objectFit"
          value={props.data.objectFit}
          onChange={props.onChange}
          items={[
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
            { value: "fill", label: "Fill" },
            { value: "none", label: "None" },
          ]}
        />
      </ContainerSetting>
    </div>
  );
};
