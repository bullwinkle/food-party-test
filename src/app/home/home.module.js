import { FpHomePageComponent } from "./components/fp-home-page/fp-home-page.component";
import { FpFibonacciComponent } from "./components/fp-fibonacci/fp-fibonacci.component";

export const homeModule = angular.module('foodParty.home',[])
  .component('fpHomePage',FpHomePageComponent)
  .component('fpFibonacci',FpFibonacciComponent)
;