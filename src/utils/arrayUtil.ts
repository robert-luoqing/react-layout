class ArrayUtil {
  removeItem(arr: any[], removeObj: any) {
    const index = arr.indexOf(removeObj);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }

  removeItemByFilter(arr: any[], filter: (item: any) => boolean) {
    for (let index = arr.length - 1; index >= 0; index--) {
      if (filter(arr[index])) {
        arr.splice(index, 1);
      }
    }
  }
}

export const arrayUtil = new ArrayUtil();
