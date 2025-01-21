import React, { useCallback, useEffect, useRef, useState } from "react";
import { PositionModel } from "../../models/positionModel";
import { positionUtil } from "../../utils/positionUtil";
import { unitUtil } from "../../utils/unitUtil";
import { isNil, omitBy } from "lodash";
export interface ServiceContainerModel {
  id: string;
  type: string;
  width?: number | string;
  height?: number | string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  position?: "absolute" | "static";
  display?: "block" | "inline-block";
}

export interface ServiceComponentProps {
  children: React.ReactNode;
  rawData: ServiceContainerModel;
  data: ServiceContainerModel;
  parentData?: ServiceContainerModel;
  selected?: boolean;
  onClick?: (data: ServiceContainerModel | undefined) => void;
  onDragStart?: (
    data: ServiceContainerModel | undefined,
    position: PositionModel,
    parentData: ServiceContainerModel | undefined
  ) => void;
  onDragEnd?: (
    data: ServiceContainerModel | undefined,
    position: PositionModel,
    parentData: ServiceContainerModel | undefined
  ) => void;
}

export interface ServiceContainerProps extends ServiceComponentProps {
  draggable?: boolean;
}

export const ServiceContainer = (props: ServiceContainerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const onDragStart: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const target = event.currentTarget;
      const position = positionUtil.getPositionByElement(
        target,
        event.clientX,
        event.clientY
      );
      props.onDragStart?.(props.rawData, position, props.parentData);
      console.log("onDragStart", props.rawData?.id, JSON.stringify(position));
      event.dataTransfer.effectAllowed = "move";
      event.stopPropagation();

      setTimeout(() => {
        setIsDragging(true);
      }, 0);
    },
    [props]
  );

  const onDragEnd: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const target = event.currentTarget;
      const position = positionUtil.getPositionByElement(
        target,
        event.clientX,
        event.clientY
      );
      props.onDragEnd?.(props.rawData, position, props.parentData);
      console.log("onDragEnd", props.rawData?.id, JSON.stringify(position));

      setIsDragging(false);
    },
    [props]
  );

  const onDrag: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      // console.log("onDrag", event.clientX, event.clientY);
    },
    []
  );

  const onClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();

      props.onClick?.(props.rawData);
    },
    [props]
  );

  return (
    <div
      className="resize overflow-auto"
      draggable={props.draggable}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        width: unitUtil.sizeParse(props.data?.width),
        height: unitUtil.sizeParse(props.data?.height),
        display: isDragging ? "none" : props.data?.display || "block",
        position: props.data?.position || "static",
        top: unitUtil.sizeParse(props.data?.top),
        left: unitUtil.sizeParse(props.data?.left),
        right: unitUtil.sizeParse(props.data?.right),
        bottom: unitUtil.sizeParse(props.data?.bottom),
      }}
    >
      <div className="w-full h-full relative overflow-hidden">
        <div className="w-full h-full relative overflow-hidden">
          {props.children}
        </div>

        <div
          className={`inset-0 pointer-events-none absolute ${
            props.selected
              ? " bg-black/10 border-[2px] border-gray-600 border-dashed"
              : "border-[0.6px] border-gray-600/20 border-dotted"
          }`}
        ></div>
      </div>
    </div>
  );
};
