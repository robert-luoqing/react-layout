import React from "react";
import { DivContainer } from "./component/container/divContainer/divContainer";

import { LabelDesign } from "./component/element/label/labelDesign";
import { LabelButton } from "./component/element/label/labelButton";
import { DivContainerButton } from "./component/container/divContainer/divContainerButton";
import { DivContainerSetting } from "./component/container/divContainer/divContainerSetting";
import { LabelSetting } from "./component/element/label/labelSetting";
import { InputDesign } from "./component/element/input/inputDesign";
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
import { FunctionProvider, registerFunctions } from "./hoc/functionHoc";
import { FetchDesign } from "./component/serviceComponent/fetch/fetchDesign";
import { FetchSetting } from "./component/serviceComponent/fetch/fetchSetting";
import { FetchService } from "./component/serviceComponent/fetch/fetchService";
import { FetchButton } from "./component/serviceComponent/fetch/fetchButton";
import { ImageSetting } from "./component/element/image/imageSetting";
import { ImagePreview } from "./component/element/image/imagePreview";
import { ImageButton } from "./component/element/image/imageButton";
import { ImageDesign } from "./component/element/image/imageDesign";
import { HorizontalLineDesign } from "./component/element/horizontalLine/horizontalLineDesign";
import { HorizontalLineSetting } from "./component/element/horizontalLine/horizontalLineSetting";
import { HorizontalLineButton } from "./component/element/horizontalLine/horizontalLineButton";
import { HorizontalLinePreview } from "./component/element/horizontalLine/horizontalLinePreview";
import { VerticalLineDesign } from "./component/element/verticalLine/verticalLineDesign";
import { VerticalLineSetting } from "./component/element/verticalLine/verticalLineSetting";
import { VerticalLinePreview } from "./component/element/verticalLine/verticalLinePreview";
import { VerticalLineButton } from "./component/element/verticalLine/verticalLineButton";

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
registerComponent(
  "Label",
  LabelDesign,
  LabelSetting,
  LabelPreview,
  LabelButton
);
registerComponent(
  "Input",
  InputDesign,
  InputSetting,
  InputPreview,
  InputButton
);
registerComponent(
  "Button",
  ButtonDesign,
  ButtonSetting,
  ButtonPreview,
  ButtonButton
);

registerComponent(
  "Image",
  ImageDesign,
  ImageSetting,
  ImagePreview,
  ImageButton
);

registerComponent(
  "HorizontalLine",
  HorizontalLineDesign,
  HorizontalLineSetting,
  HorizontalLinePreview,
  HorizontalLineButton
);

registerComponent(
  "VerticalLine",
  VerticalLineDesign,
  VerticalLineSetting,
  VerticalLinePreview,
  VerticalLineButton
);

registerComponent(
  "FetchService",
  FetchDesign,
  FetchSetting,
  FetchService,
  FetchButton
);

registerFunctions([
  {
    name: "test",
    func: async (context: any) => {
      return new Promise<void>((fulfill) => {
        console.log("-----test-----", context);
        setTimeout(() => {
          fulfill();
        }, 2000);
      });
    },
  },
]);

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
