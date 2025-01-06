import React from "react";
import { DivContainer } from "./component/container/divContainer/divContainer";

import { Label } from "./component/element/label/label";
import { LabelButton } from "./component/element/label/labelButton";
import { DivContainerButton } from "./component/container/divContainer/divContainerButton";
import { DivContainerSetting } from "./component/container/divContainer/divContainerSetting";
import { LabelSetting } from "./component/element/label/labelSetting";
import { Input } from "./component/element/input/input";
import { InputSetting } from "./component/element/input/inputSetting";
import { InputButton } from "./component/element/input/inputButton";
import { DivContainerPreview } from "./component/container/divContainer/divContainerPreview";
import { LabelPreview } from "./component/element/label/labelPreview";
import { InputPreview } from "./component/element/input/inputPreview";
import { Design } from "./component/design";
import {
  PreviewComponentProvider,
  registerPreviewComponents,
} from "./hoc/previewComponentHoc";
import {
  DesignComponentProvider,
  registerDesignComponents,
} from "./hoc/designComponentHoc";
import { ButtonDesign } from "./component/element/button/buttonDesign";
import { ButtonButton } from "./component/element/button/buttonButton";
import { ButtonSetting } from "./component/element/button/buttonSetting";
import { ButtonPreview } from "./component/element/button/buttonPreview";
import { FunctionProvider } from "./hoc/functionHoc";

function registerComponent(
  name: string,
  designComponent: any,
  settingComponent: any,
  previewComponent: any,
  buttonComponent: any
) {
  registerPreviewComponents([{ name, previewComponent }]);
  registerDesignComponents([
    { name, designComponent, settingComponent, buttonComponent },
  ]);
}

registerComponent(
  "DivContainer",
  DivContainer,
  DivContainerSetting,
  DivContainerPreview,
  DivContainerButton
);
registerComponent("Label", Label, LabelSetting, LabelPreview, LabelButton);
registerComponent("Input", Input, InputSetting, InputPreview, InputButton);
registerComponent(
  "Button",
  ButtonDesign,
  ButtonSetting,
  ButtonPreview,
  ButtonButton
);

const App = () => {
  return (
    <DesignComponentProvider>
      <PreviewComponentProvider>
        <FunctionProvider>
          <div className="w-full h-full">
            <Design />
          </div>
        </FunctionProvider>
      </PreviewComponentProvider>
    </DesignComponentProvider>
  );
};

export default App;
