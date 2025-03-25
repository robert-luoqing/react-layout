import { ContainerSetting } from "../../common/containerSetting";

import { HorizontalLineModel } from "./horizontalLineDesign";
import { TextSettingItem } from "../../common/items/textSettingItem";

export interface HorizontalLineSettingProps {
  data: HorizontalLineModel;
  onChange: (key: string, value: any) => void;
  onDelete: () => void;
}

export const HorizontalLineSetting = (props: HorizontalLineSettingProps) => {
  return (
    <div className="flex flex-col gap-2">
      <ContainerSetting
        data={props.data}
        onChange={props.onChange}
        onDelete={props.onDelete}
      >
        <TextSettingItem
          title="Line height"
          tag="lineHeight"
          value={props.data.lineHeight}
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
