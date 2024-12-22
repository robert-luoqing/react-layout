import { useCallback, useRef } from "react";
import { Container, ContainerModel, ComponentProps } from "../../common/container";
import { PositionModel } from "../../../models/positionModel";
import { positionUtil } from "../../../utils/positionUtil";

export interface DivContainerModel extends ContainerModel {
  type: "DivContainer";
}

export interface DivContainerProps extends ComponentProps {
  draggable?: boolean;
  onDrop?: (data: ContainerModel | undefined, position: PositionModel, parentData: ContainerModel | undefined, event: any) => void;
}
export const DivContainer = (props: DivContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      // console.log("drag over", event.clientX, event.clientY);
    },
    []
  );
  const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
     
      const target = event.currentTarget;
      const position = positionUtil.getPositionByElement(
        target,
        event.clientX,
        event.clientY
      );
      console.log("onDrop", props.data);
      props.onDrop?.(props.data, position, props.parentData, event);
    },
    [props]
  );
  const onDragEnter: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      console.log("onDragEnter", event.clientX, event.clientY);
    },
    []
  );
  const onDragLeave: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      console.log("onDragLeave", event.clientX, event.clientY);
    },
    []
  );

  return (
    <Container
      draggable={props.draggable??true}
      resize="both"
      {...{ ...props, children: undefined }}
      data={props.data}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {props.children}
      </div>
    </Container>
  );
};
