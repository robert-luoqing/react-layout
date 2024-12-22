import React, { useCallback, useEffect, useRef, useState } from "react";
import { isNil } from "lodash";
import { PositionModel } from "../../models/positionModel";
import { positionUtil } from "../../utils/positionUtil";
import { unitUtil } from "../../utils/unitUtil";
export interface ContainerModel {
  id: string;
  type: string;
  children?: any[];
  width?: number | string;
  height?: number | string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  border?: string;
  background?: string;
  position?: "absolute" | "static";
  display?: "block" | "inline-block";
  padding?: string;
}

export interface ComponentProps {
  children?: React.ReactNode;
  data?: ContainerModel;
  parentData?: ContainerModel;
  selected?: boolean;
  onClick?: (data: ContainerModel | undefined) => void;
  onSizeChanged?: (
    data: ContainerModel | undefined,
    size: {
      width: number | undefined;
      height: number | undefined;
    },
    parentData: ContainerModel | undefined
  ) => void;
  onDragStart?: (
    data: ContainerModel | undefined,
    position: PositionModel,
    parentData: ContainerModel | undefined
  ) => void;
  onDragEnd?: (
    data: ContainerModel | undefined,
    position: PositionModel,
    parentData: ContainerModel | undefined
  ) => void;
}

export interface ContainerProps extends ComponentProps {
  draggable?: boolean;
  resize?: "both" | "vertical" | "horizontal";
}

export const Container = (props: ContainerProps) => {
  const resizableRef = useRef<HTMLDivElement>(null);

  const isResizing = useRef(false);

  const widthRef = useRef<number | null>(null);
  const heightRef = useRef<number | null>(null);

  useEffect(() => {
    const element = resizableRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;

        widthRef.current = width;
        heightRef.current = height;
        if (isResizing.current) {
          props.onSizeChanged?.(
            props.data,
            {
              width:
                props.resize === "both" || props.resize === "horizontal"
                  ? width
                  : undefined,
              height:
                props.resize === "both" || props.resize === "vertical"
                  ? height
                  : undefined,
            },
            props.parentData
          );
        }
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [props]);

  const onHandleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = resizableRef.current;
    if (box) {
      const { offsetWidth, offsetHeight } = box;
      const resizeThreshold = 10; // 调整边缘的阈值

      if (
        e.nativeEvent.offsetX > offsetWidth - resizeThreshold && // 点击在右边缘
        e.nativeEvent.offsetY > offsetHeight - resizeThreshold // 点击在下边缘
      ) {
        console.log("Resize started!");
        isResizing.current = true;
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current) {
        console.log("Resizing...");
      }
    };

    const handleMouseUp = (event: any) => {
      if (isResizing.current) {
        console.log("Resize ended!");
        setTimeout(() => {
          isResizing.current = false;
        }, 0);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const onDragStart: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const target = event.currentTarget;
      const position = positionUtil.getPositionByElement(
        target,
        event.clientX,
        event.clientY
      );
      props.onDragStart?.(props.data, position, props.parentData);
      console.log("onDragStart", props.data?.id, JSON.stringify(position));
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
      props.onDragEnd?.(props.data, position, props.parentData);
      console.log("onDragEnd", props.data?.id, JSON.stringify(position));

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
      if (!isResizing.current) {
        props.onClick?.(props.data);
      }
    },
    [props]
  );

  return (
    <div
      ref={resizableRef}
      className="resize overflow-auto"
      draggable={props.draggable}
      onMouseDown={onHandleMouseDown}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        width: unitUtil.sizeParse(props.data?.width),
        height: unitUtil.sizeParse(props.data?.height),
        resize: props.resize,
        display: isDragging ? "none" : props.data?.display || "block",
        position: props.data?.position || "static",
        top: unitUtil.sizeParse(props.data?.top),
        left: unitUtil.sizeParse(props.data?.left),
        right: unitUtil.sizeParse(props.data?.right),
        bottom: unitUtil.sizeParse(props.data?.bottom),
      }}
    >
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="w-full h-full relative overflow-hidden"
          style={{
            padding: props.data?.padding,
            border: props.data?.border,
            background: props.data?.background,
          }}
        >
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
