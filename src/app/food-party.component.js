import styles from "./food-party.styles.scss";

export const FpAppComponent = {
  styles: styles,
  template: `
    <menu>
      <a ui-sref="foodParty.index">Home</a>
      <a href="/hz-4to">404</a>
    </menu>
    <div ui-view class="fp-app-component"></div>
  `,
  controller: class FoodPartyAppComponentController {
    constructor () {
      "ngInject";
      console.log(this);
    }

    $onInit () {
      console.log('$onInit');
    }

    $onDestroy () {
      console.log('$onDestroy');
    }
  }
};
