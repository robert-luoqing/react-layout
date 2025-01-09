import { createContext, useContext, useEffect, useState } from "react";

export interface FunctionInfo {
  name: string;
  func: (context: any, param: any) => Promise<any> | void;
}

export interface FunctionModel {
  functions: {
    [name: string]: (context: any, param: any) => Promise<any> | void;
  };
}

const defaultFunctionData: FunctionModel = {
  functions: {},
};

const FunctionContext = createContext(defaultFunctionData);

const addNewFunctions = (
  functionInfos: FunctionModel,
  funcs: FunctionInfo[]
) => {
  const newFunctions = { ...functionInfos.functions };
  for (const component of funcs) {
    newFunctions[component.name] = component.func;
  }
  return newFunctions;
};

const registerInstance = {
  registerCallback: (funcs: FunctionInfo[]) => {
    const newInfo = addNewFunctions(defaultFunctionData, funcs);
    defaultFunctionData.functions = newInfo;
  },
};

export const FunctionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [functionInfos, setFunctionInfos] =
    useState<FunctionModel>(defaultFunctionData);
  useEffect(() => {
    registerInstance.registerCallback = (funcs: FunctionInfo[]) => {
      setFunctionInfos({ functions: addNewFunctions(functionInfos, funcs) });
    };
  }, [functionInfos]);

  return (
    <FunctionContext.Provider value={functionInfos}>
      {children}
    </FunctionContext.Provider>
  );
};

export const useFunctions = () => {
  return useContext(FunctionContext);
};

export const registerFunctions = (components: FunctionInfo[]) => {
  registerInstance.registerCallback(components);
};
