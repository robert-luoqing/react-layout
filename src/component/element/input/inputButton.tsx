import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export const InputButton = () => {
  const onDragStart: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const data = {
        id: uuidv4(),
        type: "Input",
        position: "absolute",
        text: "Text",
        display: "inline-block",
        children: [],
      };
      event.dataTransfer.setData("text/plain", JSON.stringify(data));
    },
    []
  );

  return (
    <div
      className="text-center  border-[1px] border-gray-300 border-solid py-[6px] cursor-pointer"
      draggable="true"
      onDragStart={onDragStart}
    >
      Input
    </div>
  );
};
