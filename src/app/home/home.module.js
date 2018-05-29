import { FpHomePageComponent } from "./components/fp-home-page/fp-home-page.component";

export const homeModule = angular.module('foodParty.home',[])
  .component('fpHomePage',FpHomePageComponent)
;