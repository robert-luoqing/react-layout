import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export const LabelButton = () => {
  const onDragStart: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const data = {
        id: uuidv4(),
        type: "Label",
        position: "absolute",
        text: "Label",
        display: "inline-block",
        padding: '2px',
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
      Label
    </div>
  );
};
