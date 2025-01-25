import {
  Container,
  ComponentProps,
  ContainerModel,
} from "../../common/container";
import { CloudDownloadOutlined } from "@ant-design/icons";

export interface FetchServiceModel extends ContainerModel {
  type: "FetchService";
  url?: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  // Which data will be post if method is post
  postDataPath?: string;

  // show mask when fetching
  maskOnFetching?: boolean;
  // Which property will keep the fetch status, the property will be used in other element
  fetchStatusToPropPath?: string;
  // Which property will keep the data, the property will be used in other element
  dataToPropPath?: string;
  errorToPropPath?: string;

  fireFetchType: "onload" | "onchange";
  propPathOnChange?: string;
  onChangePolicy?: "fetchOnAll" | "fetchOnNonEmpty" | "fetchOnNonNil";
}

export interface FetchDesignProps extends ComponentProps {
  children?: undefined;
}
export const FetchDesign = (props: FetchDesignProps) => {
  return (
    <Container
      draggable={true}
      resize="none"
      {...{ ...props, children: undefined }}
      data={props.rawData}
      rawData={props.rawData}
    >
      <div className="w-full h-full relative p-1">
        <CloudDownloadOutlined />
        <div className="absolute inset-0 bg-transparent"></div>
      </div>
    </Container>
  );
};
