import { ContainerSetting } from "../../common/containerSetting";

import { VerticalLineModel } from "./verticalLineDesign";
import { TextSettingItem } from "../../common/items/textSettingItem";

export interface VerticalLineSettingProps {
  data: VerticalLineModel;
  onChange: (key: string, value: any) => void;
  onDelete: () => void;
}

export const VerticalLineSetting = (props: VerticalLineSettingProps) => {
  return (
    <div className="flex flex-col gap-2">
      <ContainerSetting
        data={props.data}
        onChange={props.onChange}
        onDelete={props.onDelete}
      >
        <TextSettingItem
          title="Line Width"
          tag="lineWidth"
          value={props.data.lineWidth}
          onChange={props.onChange}
        />
        <TextSettingItem
          title="Line Color"
          tag="lineColor"
          value={props.data.lineColor}
          onChange={props.onChange}
        />
      </ContainerSetting>
    </div>
  );
};
