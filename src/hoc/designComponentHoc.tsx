import { createContext, useContext, useEffect, useState } from "react";

export interface DesignComponentInfo {
  name: string;
  designComponent: any;
  settingComponent: any;
  buttonComponent: any;
}

export interface DesignComponentModel {
  components: DesignComponentInfo[];
  componentsMap: { [name: string]: DesignComponentInfo };
}

const defaultDesignComponentData: DesignComponentModel = {
  components: [],
  componentsMap: {},
};

const DesignComponentContext = createContext(defaultDesignComponentData);

const addNewComponent = (
  componentInfos: DesignComponentModel,
  newComps: DesignComponentInfo[]
) => {
  const newComponents = [...componentInfos.components];
  const newComponentsMap = { ...componentInfos.componentsMap };
  for (const component of newComps) {
    // remove exist component if old exist
    if (newComponentsMap[component.name]) {
      for (let i = 0; i < newComponents.length; i++) {
        if (newComponents[i].name === component.name) {
          newComponents.splice(i, 1);
          break;
        }
      }
    }

    newComponents.push(component);
    newComponentsMap[component.name] = component;
  }

  return {
    components: newComponents,
    componentsMap: newComponentsMap,
  };
};

const registerInstance = {
  registerCallback: (components: DesignComponentInfo[]) => {
    const newInfo = addNewComponent(defaultDesignComponentData, components)
    defaultDesignComponentData.components = newInfo.components;
    defaultDesignComponentData.componentsMap = newInfo.componentsMap;
  },
};

export const DesignComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [componentInfos, setComponentInfos] = useState<DesignComponentModel>(
    defaultDesignComponentData
  );

  useEffect(() => {
    registerInstance.registerCallback = (comps: DesignComponentInfo[]) => {
      setComponentInfos(addNewComponent(componentInfos, comps));
    };
  }, [componentInfos]);

  return (
    <DesignComponentContext.Provider value={componentInfos}>
      {children}
    </DesignComponentContext.Provider>
  );
};

export const useDesignComponents = () => {
  return useContext(DesignComponentContext);
};

export const registerDesignComponents = (components: DesignComponentInfo[]) => {
  registerInstance.registerCallback(components);
};
