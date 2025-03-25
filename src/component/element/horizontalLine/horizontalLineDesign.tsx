import { unitUtil } from "../../../utils/unitUtil";
import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/containerDesign";

export interface HorizontalLineModel extends ContainerModel {
  type: "HorizontalLine";
  lineHeight: string | number;
  lineColor: string;
}

export interface HorizontalLineDesignProps extends ComponentProps {
  children?: undefined;
}
export const HorizontalLineDesign = (props: HorizontalLineDesignProps) => {
  const data = props.data as HorizontalLineModel;

  return (
    <Container
      draggable={true}
      resize="horizontal"
      {...{ ...props, children: undefined }}
      data={props.data}
    >
      <div
        className="h-[1px] w-full"
        style={{
          backgroundColor: data.lineColor || "grey",
          height: unitUtil.sizeParse(data.lineHeight || 1),
        }}
      ></div>
    </Container>
  );
};
