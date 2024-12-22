import { isNil } from "lodash";

class UnitUtil {
  sizeParse(size: string | number | undefined | null) {
    if (isNil(size)) {
      return undefined;
    }
    if (typeof size === "number") {
      return size;
    }

    function isNumberString(value: string): boolean {
      return value.trim() !== "" && Number.isFinite(Number(value));
    }
    if (isNumberString(size)) {
      return Number(size);
    }

    return size;
  }
}

export const unitUtil = new UnitUtil();
