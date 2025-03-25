import { DivContainerModel } from "./divContainer";
import { ContainerSetting } from "../../common/containerSetting";

export interface DivContainerSettingProps {
  data: DivContainerModel;
  onChange: (key: string, value: any) => void;
  onDelete: () => void;
}

export const DivContainerSetting = (props: DivContainerSettingProps) => {
  return (
    <div className="flex flex-col gap-2">
      <ContainerSetting data={props.data} onChange={props.onChange} onDelete={props.onDelete} />
   
    </div>
  );
};
