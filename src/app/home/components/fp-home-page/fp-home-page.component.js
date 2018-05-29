import styles from './fp-home-page.component.scss';
import template from './fp-home-page.html';

export const FpHomePageComponent = {
  template,
  styles,
  transclude: true,
  bindings: {},
  controller: class FpHomePageComponentController {
    constructor () {
      "ngInject";
      console.log(this);

      this.inputModel = '';
    }

    validateInput (value) {
      console.log('validateInput',value);
      return /^[a-zA-Z]+$/.test(value);
    }
  }
};



if (module.hot) module.hot.accept('./fp-home-page.component.scss');
