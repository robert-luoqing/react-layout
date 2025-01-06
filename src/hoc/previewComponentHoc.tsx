import { createContext, useContext, useEffect, useState } from "react";

export interface PreviewComponentInfo {
  name: string;
  previewComponent: any;
}

export interface PreviewComponentModel {
  components: PreviewComponentInfo[];
  componentsMap: { [name: string]: PreviewComponentInfo };
}

const defaultPreviewComponentData: PreviewComponentModel = {
  components: [],
  componentsMap: {},
};

const PreviewComponentContext = createContext(defaultPreviewComponentData);

const addNewComponent = (
  componentInfos: PreviewComponentModel,
  comps: PreviewComponentInfo[]
) => {
  const newComponents = [...componentInfos.components];
  const newComponentsMap = { ...componentInfos.componentsMap };
  for (const component of comps) {
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
  registerCallback: (components: PreviewComponentInfo[]) => {
    const newInfo = addNewComponent(defaultPreviewComponentData, components);
    defaultPreviewComponentData.components = newInfo.components;
    defaultPreviewComponentData.componentsMap = newInfo.componentsMap;
  },
};

export const PreviewComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [componentInfos, setComponentInfos] = useState<PreviewComponentModel>(
    defaultPreviewComponentData
  );
  useEffect(() => {
    registerInstance.registerCallback = (comps: PreviewComponentInfo[]) => {
      setComponentInfos(addNewComponent(componentInfos, comps));
    };
  }, [componentInfos]);
  return (
    <PreviewComponentContext.Provider value={componentInfos}>
      {children}
    </PreviewComponentContext.Provider>
  );
};

export const usePreviewComponents = () => {
  return useContext(PreviewComponentContext);
};

export const registerPreviewComponents = (
  components: PreviewComponentInfo[]
) => {
  registerInstance.registerCallback(components);
};
