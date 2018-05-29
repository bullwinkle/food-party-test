import { uiModule } from "./ui/ui.module";
import { FpAppComponent } from "./food-party.component";
import { configureFoodPartyRouter } from "./food-party.router";
import { configureFoodPartyModule } from "./food-party.config";
import { homeModule } from "./home/home.module";

window.foodPartyConf = window.foodPartyConf || {};
window.foodPartyConf.APP_BASE_URL = window.foodPartyConf.APP_BASE_URL || process.env.APP_BASE_URL;
window.foodPartyConf.API_URL = window.foodPartyConf.API_URL || process.env.API_URL;

export const foodPartyModule = angular.module('food-party', [
    'foodPartyVendor',
    uiModule.name,
    homeModule.name
  ])
  .config(configureFoodPartyModule)
  .config(configureFoodPartyRouter)
  .constant('gplansConf', {
    APP_BASE_URL: window.foodPartyConf.APP_BASE_URL,
    API_URL: window.foodPartyConf.API_URL,
  })
  .component('fpAppComponent', FpAppComponent)
;