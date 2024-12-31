class FuncUtil {
  evaluateCondition = (condition: string, context: any) => {
    try {
      // eslint-disable-next-line no-new-func
      const func = new Function(
        ...Object.keys(context),
        `return ${condition};`
      );
      return func(...Object.values(context));
    } catch (error) {
      console.error("Error evaluating condition:", error);
      return false; // 默认返回 false
    }
  };
}

export const funcUtil = new FuncUtil();
