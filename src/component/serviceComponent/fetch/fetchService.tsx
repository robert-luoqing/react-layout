import { useEffect, useMemo, useRef, useState } from "react";
import { ComponentPreviewProps } from "../../common/containerPreview";
import { objUtil } from "../../../utils/objUtil";
import { isNil } from "lodash";
import { FetchServiceModel } from "./fetchDesign";
import { usePrevious } from "@uidotdev/usehooks";

export interface FetchServiceProps extends ComponentPreviewProps {
  children?: undefined;
  onChange: (
    val: any,
    path: string | undefined,
    data: any,
    forData: Array<{ forItemName: string; forItemData: any }>
  ) => void;
}
export const FetchService = (props: FetchServiceProps) => {
  const [loading, setLoading] = useState(false);
  const elementData = props.elementData as FetchServiceModel;

  const url = useMemo(() => {
    return objUtil.formatFromDataAndForData(
      elementData?.url,
      props.data,
      props.forData
    );
  }, [elementData?.url, props.data, props.forData]);

  const postData = useMemo(() => {
    if (!elementData.postDataPath) {
      return null;
    }
    if (elementData.postDataPath.trim() === ".") {
      return props.data;
    }

    return objUtil.getPropFromDataAndForData(
      props.data,
      props.forData,
      elementData.postDataPath
    );
  }, [elementData.postDataPath, props.data, props.forData]);

  const onChangeData = useMemo(() => {
    let basedData = null;
    if (!elementData.propPathOnChange) {
      basedData = null;
    } else if (elementData.propPathOnChange === ".") {
      basedData = props.data;
    } else {
      basedData = objUtil.getPropFromDataAndForData(
        props.data,
        props.forData,
        elementData.propPathOnChange
      );
    }

    return basedData;
  }, [elementData.propPathOnChange, props.data, props.forData]);

  const prevUrl = usePrevious(url);
  const firedRef = useRef(false);
  const prevOnChangeData = useRef<any>(null);
  useEffect(() => {
    const fetchData = async (url: string, method?: string, postData?: any) => {
      setLoading(true);
      if (elementData.fetchStatusToPropPath) {
        props.onChange(
          true,
          elementData.fetchStatusToPropPath,
          props.data,
          props.forData
        );
      }

      try {
        const data = await fetch(url, {
          method,
          body: postData,
        });
        if (elementData.dataToPropPath) {
          props.onChange(
            data,
            elementData.dataToPropPath,
            props.data,
            props.forData
          );
        }
      } catch (e) {
        if (elementData.errorToPropPath) {
          props.onChange(
            e,
            elementData.errorToPropPath,
            props.data,
            props.forData
          );
        }
      } finally {
        setLoading(false);
        if (elementData.fetchStatusToPropPath) {
          props.onChange(
            false,
            elementData.fetchStatusToPropPath,
            props.data,
            props.forData
          );
        }
      }
    };
    if (url && prevUrl !== url) {
      // First fire
      if (!firedRef.current) {
        firedRef.current = true;
        fetchData(url, elementData.method, postData);
      } else {
        if (elementData.fireFetchType === "onchange") {
          if (onChangeData !== prevOnChangeData.current) {
            if (elementData.onChangePolicy === "fetchOnAll") {
              fetchData(url, elementData.method, postData);
            } else if (elementData.onChangePolicy === "fetchOnNonEmpty") {
              if (!onChangeData) {
                fetchData(url, elementData.method, postData);
              }
            } else if (elementData.onChangePolicy === "fetchOnNonNil") {
              if (!isNil(onChangeData)) {
                fetchData(url, elementData.method, postData);
              }
            } else {
              fetchData(url, elementData.method, postData);
            }
          }
        }
      }
    }

    prevOnChangeData.current = onChangeData;
  }, [
    elementData.method,
    postData,
    url,
    prevUrl,
    elementData.propPathOnChange,
    elementData.fireFetchType,
    props.data,
    props.forData,
    onChangeData,
    elementData.onChangePolicy,
    elementData.fetchStatusToPropPath,
    elementData.dataToPropPath,
    elementData.errorToPropPath,
    props,
  ]);
  return (
    <>
      {elementData.maskOnFetching && loading && (
        <div className="fixed inset-0 bg-gray-400 z-[999]">Loading...</div>
      )}
    </>
  );
};
