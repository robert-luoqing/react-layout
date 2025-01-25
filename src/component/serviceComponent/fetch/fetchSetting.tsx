import { TextSettingItem } from "../../common/items/textSettingItem";
import { CheckboxSettingItem } from "../../common/items/checkboxSettingItem";
import { FetchServiceModel } from "./fetchDesign";
import { SelectSettingItem } from "../../common/items/selectSettingItem";

export interface FetchSettingProps {
  data: FetchServiceModel;
  onChange: (key: string, value: any) => void;
}

export const FetchSetting = (props: FetchSettingProps) => {
  return (
    <div className="flex flex-col gap-2">
      <TextSettingItem
        title="Id"
        tag="id"
        value={props.data.id}
        onChange={props.onChange}
      />
      <TextSettingItem
        title="Url"
        tag="url"
        value={props.data.url}
        onChange={props.onChange}
      />
      <SelectSettingItem
        title="Method"
        tag="method"
        value={props.data.method}
        onChange={props.onChange}
        items={[
          { value: "get", label: "GET" },
          { value: "post", label: "POST" },
          { value: "put", label: "PUT" },
          { value: "delete", label: "DELETE" },
        ]}
      />
      <TextSettingItem
        title="Post Data Path"
        tag="postDataPath"
        value={props.data.postDataPath}
        onChange={props.onChange}
      />
      <CheckboxSettingItem
        title="Show Mask On Fetching"
        tag="maskOnFetching"
        value={props.data.maskOnFetching}
        onChange={props.onChange}
      />
      <TextSettingItem
        title="Prop Path For Fetch Status"
        tag="fetchStatusToPropPath"
        value={props.data.fetchStatusToPropPath}
        onChange={props.onChange}
      />
      <TextSettingItem
        title="Prop Path For Result"
        tag="dataToPropPath"
        value={props.data.dataToPropPath}
        onChange={props.onChange}
      />

      <SelectSettingItem
        title="Fetch Type"
        tag="fireFetchType"
        value={props.data.fireFetchType}
        onChange={props.onChange}
        items={[
          { value: "onload", label: "Fetch On Load" },
          { value: "onchange", label: "Fetch When Specify Value Change" },
        ]}
      />
      {props.data.fireFetchType === "onchange" && (
        <>
          <TextSettingItem
            title="Fetching When Prop Path Changed"
            tag="propPathOnChange"
            value={props.data.propPathOnChange}
            onChange={props.onChange}
          />

          <SelectSettingItem
            title="Change Policy"
            tag="onChangePolicy"
            value={props.data.onChangePolicy}
            onChange={props.onChange}
            items={[
              { value: "fetchOnAll", label: "Fetch When Value Changed" },
              {
                value: "fetchOnNonEmpty",
                label: "Fetch When Value Changed But Non Empty",
              },
              {
                value: "fetchOnNonNil",
                label: "Fetch When Value Changed But Non Nil",
              },
            ]}
          />
        </>
      )}
    </div>
  );
};
