import { unitUtil } from "../../../utils/unitUtil";
import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/containerDesign";

export interface VerticalLineModel extends ContainerModel {
  type: "VerticalLine";
  lineWidth: string | number;
  lineColor: string;
}

export interface VerticalLineDesignProps extends ComponentProps {
  children?: undefined;
}
export const VerticalLineDesign = (props: VerticalLineDesignProps) => {
  const data = props.data as VerticalLineModel;

  return (
    <Container
      draggable={true}
      resize="vertical"
      {...{ ...props, children: undefined }}
      data={props.data}
    >
      <div
        className="w-[1px] h-full"
        style={{
          backgroundColor: data.lineColor || "grey",
          width: unitUtil.sizeParse(data.lineWidth || 1),
        }}
      ></div>
    </Container>
  );
};
