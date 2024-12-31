import { useCallback, useState } from "react";
import { Input, Select } from "antd";
import { ContainerModel } from "./container";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

export interface ContainerSettingProps {
  data: ContainerModel;
  onChange: (key: string, value: any) => void;
}

export const ContainerSetting = (props: ContainerSettingProps) => {
  const [borderPropVisible, setBorderPropVisible] = useState(false);
  const [positionPropVisible, setPositionPropVisible] = useState(false);
  const [controlPropVisible, setControlPropVisible] = useState(false);

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
      <div className="py-5">
        <div className="flex flex-raw border-b-[1px] border-gray-400 border-solid">
          <div className="flex-1">Border Setting</div>
          <div
            onClick={() => setBorderPropVisible(!borderPropVisible)}
            className="cursor-pointer"
          >
            {borderPropVisible ? (
              <MinusCircleOutlined />
            ) : (
              <PlusCircleOutlined />
            )}
          </div>
        </div>
        {borderPropVisible && (
          <div className="border-b-[1px] border-gray-400 border-solid pb-2">
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
              <div className="font-bold text-[10px]">Border Top</div>
              <div>
                <Input
                  type="text"
                  className="w-full"
                  data-tag="borderTop"
                  value={props.data.borderTop}
                  onChange={onTextChange}
                />
              </div>
            </div>
            <div>
              <div className="font-bold text-[10px]">Border Right</div>
              <div>
                <Input
                  type="text"
                  className="w-full"
                  data-tag="borderRight"
                  value={props.data.borderRight}
                  onChange={onTextChange}
                />
              </div>
            </div>
            <div>
              <div className="font-bold text-[10px]">Border Bottom</div>
              <div>
                <Input
                  type="text"
                  className="w-full"
                  data-tag="borderBottom"
                  value={props.data.borderBottom}
                  onChange={onTextChange}
                />
              </div>
            </div>
            <div>
              <div className="font-bold text-[10px]">Border Left</div>
              <div>
                <Input
                  type="text"
                  className="w-full"
                  data-tag="borderLeft"
                  value={props.data.borderLeft}
                  onChange={onTextChange}
                />
              </div>
            </div>
            <div>
              <div className="font-bold text-[10px]">Border Radius</div>
              <div>
                <Input
                  type="text"
                  className="w-full"
                  data-tag="borderRadius"
                  value={props.data.borderRadius}
                  onChange={onTextChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="py-5">
        <div className="flex flex-raw border-b-[1px] border-gray-400 border-solid">
          <div className="flex-1">Position Setting</div>
          <div
            onClick={() => setPositionPropVisible(!positionPropVisible)}
            className="cursor-pointer"
          >
            {positionPropVisible ? (
              <MinusCircleOutlined />
            ) : (
              <PlusCircleOutlined />
            )}
          </div>
        </div>
        {positionPropVisible && (
          <div className="border-b-[1px] border-gray-400 border-solid pb-2">
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
          </div>
        )}
      </div>

      <div className="py-5">
        <div className="flex flex-raw border-b-[1px] border-gray-400 border-solid">
          <div className="flex-1">Control Setting</div>
          <div
            onClick={() => setControlPropVisible(!controlPropVisible)}
            className="cursor-pointer"
          >
            {controlPropVisible ? (
              <MinusCircleOutlined />
            ) : (
              <PlusCircleOutlined />
            )}
          </div>
        </div>
        {controlPropVisible && (
          <div className="border-b-[1px] border-gray-400 border-solid pb-2">
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

            <div>
              <div className="font-bold text-[10px]">If Condition</div>
              <div>
                <Input
                  type="text"
                  className="w-full"
                  data-tag="if"
                  value={props.data.if}
                  onChange={onTextChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
