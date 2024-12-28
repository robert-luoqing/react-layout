import { useCallback } from "react";
import { Input, Select } from "antd";
import { ContainerModel } from "./container";

export interface ContainerSettingProps {
  data: ContainerModel;
  onChange: (key: string, value: any) => void;
}

export const ContainerSetting = (props: ContainerSettingProps) => {
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
      <div>
        <div className="font-bold text-[10px]">Id</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="id"
            value={props.data.id}
            onChange={onTextChange}
          />
        </div>
      </div>
      <div>
        <div className="font-bold text-[10px]">Width</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="width"
            value={props.data.width}
            onChange={onTextChange}
          />
        </div>
      </div>
      <div>
        <div className="font-bold text-[10px]">Height</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="height"
            value={props.data.height}
            onChange={onTextChange}
          />
        </div>
      </div>
      <div>
        <div className="font-bold text-[10px]">Background</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="background"
            value={props.data.background}
            onChange={onTextChange}
          />
        </div>
      </div>
      <div>
        <div className="font-bold text-[10px]">Border</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="border"
            value={props.data.border}
            onChange={onTextChange}
          />
        </div>
      </div>
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
          <div>
            <div className="font-bold text-[10px]">Top</div>
            <div>
              <Input
                type="text"
                className="w-full"
                data-tag="top"
                value={props.data.top}
                onChange={onTextChange}
              />
            </div>
          </div>

          <div>
            <div className="font-bold text-[10px]">Right</div>
            <div>
              <Input
                type="text"
                className="w-full"
                data-tag="right"
                value={props.data.right}
                onChange={onTextChange}
              />
            </div>
          </div>

          <div>
            <div className="font-bold text-[10px]">Bottom</div>
            <div>
              <Input
                type="text"
                className="w-full"
                data-tag="bottom"
                value={props.data.bottom}
                onChange={onTextChange}
              />
            </div>
          </div>

          <div>
            <div className="font-bold text-[10px]">Left</div>
            <div>
              <Input
                type="text"
                className="w-full"
                data-tag="left"
                value={props.data.left}
                onChange={onTextChange}
              />
            </div>
          </div>
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
      <div>
        <div className="font-bold text-[10px]">Padding</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="padding"
            value={props.data.padding}
            onChange={onTextChange}
          />
        </div>
      </div>

      <div>
        <div className="font-bold text-[10px]">For Path</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="forPath"
            value={props.data.forPath}
            onChange={onTextChange}
          />
        </div>
      </div>

      <div>
        <div className="font-bold text-[10px]">For Item Name</div>
        <div>
          <Input
            type="text"
            className="w-full"
            data-tag="forItemName"
            value={props.data.forItemName}
            onChange={onTextChange}
          />
        </div>
      </div>
    </div>
  );
};
