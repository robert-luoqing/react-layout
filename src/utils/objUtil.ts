import { isNil } from "lodash";

class ObjUtil {
  getPropPath(path: string): string[] {
    if (typeof path !== "string" || path.trim() === "") {
      throw new Error("Path must be a non-empty string");
    }

    // 将数组索引语法转换为点语法，然后分解为路径数组
    return path.replace(/\[(\d+)\]/g, ".$1").split(".");
  }

  setProp(obj: any, path: string, value: any): any {
    if (typeof path !== "string" || path.trim() === "") {
      return "";
    }

    // 转换数组索引语法为点语法
    const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
    const result = Array.isArray(obj) ? [...obj] : { ...obj }; // 保持原对象不可变
    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isLastKey = i === keys.length - 1;

      if (isLastKey) {
        // 如果是最后一个键，设置值
        current[key] = value;
      } else {
        // 如果当前层级不存在，创建对象或数组
        if (!current[key] || typeof current[key] !== "object") {
          current[key] = isNaN(Number(keys[i + 1])) ? {} : [];
        }

        // 移动到下一层
        current = current[key];
      }
    }

    return result;
  }

  getProp(obj: any, path: string): any {
    if (typeof path !== "string" || path.trim() === "") {
      return "";
    }

    // Split the path into an array of keys
    const keys = path
      .replace(/\[(\d+)\]/g, ".$1") // 将数组访问形式转换为点形式，例如 users[0] -> users.0
      .split(".");

    let current = obj;

    for (const key of keys) {
      // 如果当前值为 null 或不是对象，则直接返回 undefined
      if (
        current === null ||
        typeof current !== "object" ||
        !(key in current)
      ) {
        return undefined;
      }
      current = current[key];
    }

    return current;
  }

  getTargetObjForProps(
    data: any,
    forData: Array<{ forItemName: string; forItemData: any }>,
    path: string
  ): any {
    let targetObj: any = null;
    let isMatched = false;
    const firstObjPropName = this.getPropPath(path)[0];
    for (let i = forData.length - 1; i >= 0; i--) {
      const forItemData = forData[i];
      if (firstObjPropName === forItemData.forItemName) {
        targetObj = { [forItemData.forItemName]: forItemData.forItemData };
        isMatched = true;
        break;
      }
    }
    if (!isMatched) {
      targetObj = data;
    }

    return targetObj;
  }

  getPropFromDataAndForData = (
    data: any,
    forData: Array<{ forItemName: string; forItemData: any }>,
    path: string
  ): any => {
    const targetObj = this.getTargetObjForProps(data, forData, path);
    if (targetObj) {
      return this.getProp(targetObj, path);
    }

    return null;
  };

  format(
    template: string | undefined | null,
    data: Record<string, any>
  ): string | undefined | null {
    if (isNil(template)) {
      return template;
    }

    return template.replace(/\{([^}]+)\}/g, (_, path) => {
      const value = this.getProp(data, path.trim());
      // return value !== undefined ? value : `{${path}}`;
      return value !== undefined ? value : "";
    });
  }

  formatFromDataAndForData(
    template: string | undefined | null,
    data: Record<string, any>,
    forData: Array<{ forItemName: string; forItemData: any }>
  ): string | undefined | null {
    if (isNil(template)) {
      return template;
    }

    return template.replace(/\{([^}]+)\}/g, (_, path) => {
      const value = this.getPropFromDataAndForData(data, forData, path.trim());
      // return value !== undefined ? value : `{${path}}`;
      return value !== undefined ? value : "";
    });
  }
}

export const objUtil = new ObjUtil();
