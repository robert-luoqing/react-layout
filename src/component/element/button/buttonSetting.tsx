import { useCallback } from "react";
import { ContainerSetting } from "../../common/containerSetting";

import { Checkbox, Input } from "antd";
import { ButtonDesignModel } from "./buttonDesign";
import { ExpandSetting } from "../../common/expandSetting";

export interface ButtonSettingProps {
  data: ButtonDesignModel;
  onChange: (key: string, value: any) => void;
  onDelete: () => void;
}

export const ButtonSetting = (props: ButtonSettingProps) => {
  const onTextChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      const tag = event.target.getAttribute("data-tag");
      props.onChange(tag, value);
    },
    [props]
  );
  const onCheckboxChange = useCallback(
    (event: any) => {
      const value = event.target.checked;
      const tag = event.target["data-tag"];

      props.onChange(tag, value);
    },
    [props]
  );

  return (
    <div className="flex flex-col gap-2">
      <ContainerSetting
        data={props.data}
        onChange={props.onChange}
        onDelete={props.onDelete}
      >
        <div>
          <div className="font-bold text-[10px]">Text</div>
          <div>
            <Input
              type="text"
              className="w-full"
              data-tag="text"
              value={props.data.text}
              onChange={onTextChange}
            />
          </div>
        </div>
        <div>
          <div className="font-bold text-[10px]">Font Size</div>
          <div>
            <Input
              type="text"
              className="w-full"
              data-tag="fontSize"
              value={props.data.fontSize}
              onChange={onTextChange}
            />
          </div>
        </div>
        <div>
          <div className="font-bold text-[10px]">Font Weight</div>
          <div>
            <Input
              type="text"
              className="w-full"
              data-tag="fontWeight"
              value={props.data.fontWeight}
              onChange={onTextChange}
            />
          </div>
        </div>

        <ExpandSetting title="Click Setting">
          <div>
            <div className="font-bold text-[10px]">Function Name</div>
            <div>
              <Input
                type="text"
                className="w-full"
                data-tag="funcName"
                value={props.data.funcName}
                onChange={onTextChange}
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-[10px]">Param1</div>
            <div>
              <Input
                type="text"
                className="w-full"
                data-tag="funcParam1"
                value={props.data.funcParam1}
                onChange={onTextChange}
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-[10px]">Param2</div>
            <div>
              <Input
                type="text"
                className="w-full"
                data-tag="funcParam2"
                value={props.data.funcParam2}
                onChange={onTextChange}
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-[10px]">Param3</div>
            <div>
              <Input
                type="text"
                className="w-full"
                data-tag="funcParam3"
                value={props.data.funcParam3}
                onChange={onTextChange}
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-[10px]">Param4</div>
            <div>
              <Input
                type="text"
                className="w-full"
                data-tag="funcParam4"
                value={props.data.funcParam4}
                onChange={onTextChange}
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-[10px]">Result Path</div>
            <div>
              <Input
                type="text"
                className="w-full"
                data-tag="resultPath"
                value={props.data.resultPath}
                onChange={onTextChange}
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-[10px]">Loading when click</div>
            <div>
              <Checkbox
                data-tag="loadingWhenExec"
                checked={props.data.loadingWhenExec}
                onChange={onCheckboxChange}
              />
            </div>
          </div>
        </ExpandSetting>
      </ContainerSetting>
    </div>
  );
};
