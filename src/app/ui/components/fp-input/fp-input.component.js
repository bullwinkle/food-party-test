import styles from './fp-input.component.scss';
import template from './fp-input.html';

export const FpInputComponent = {
  template,
  styles,
  bindings: {},
  controller: class FpInputComponentController {
    constructor () {
      "ngInject";
      console.log(this);
    }
  }
};



if (module.hot) module.hot.accept('./fp-input.component.scss');
