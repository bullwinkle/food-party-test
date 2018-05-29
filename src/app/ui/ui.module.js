import { FpButtonComponent } from "./components/fp-button/fp-button.component";
import { FpInputComponent } from "./components/fp-input/fp-input.component";
import { FpMediaElementComponent } from "./components/fp-media-element/fp-media-element.component";

export const uiModule = angular.module('ui',[])
  .component('fpButton',FpButtonComponent)
  .component('fpInput',FpInputComponent)
  .component('fpMediaElement',FpMediaElementComponent)
;