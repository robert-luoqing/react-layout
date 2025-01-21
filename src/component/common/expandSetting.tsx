import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export interface ExpandSettingProps {
  children?: React.ReactNode;
  title: string;
}

export const ExpandSetting = (props: ExpandSettingProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="py-5">
      <div className="flex flex-raw border-b-[1px] border-gray-400 border-solid">
        <div className="flex-1">{props.title}</div>
        <div onClick={() => setExpand(!expand)} className="cursor-pointer">
          {expand ? <MinusCircleOutlined /> : <PlusCircleOutlined />}
        </div>
      </div>
      {expand && (
        <div className="border-b-[1px] border-gray-400 border-solid pb-2">
          {props.children}
        </div>
      )}
    </div>
  );
};
