import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export const ImageButton = () => {
  const onDragStart: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const data = {
        id: uuidv4(),
        type: "Image",
        position: "absolute",
        src: "",
        display: "inline-block",
        width: 300,
        height: 300,
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
      Image
    </div>
  );
};
