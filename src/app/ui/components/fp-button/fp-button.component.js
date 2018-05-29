import styles from './fp-button.component.scss';
import template from './fp-button.html';

export const FpButtonComponent = {
  template,
  styles,
  bindings: {},
  controller: class FpButtonComponentController {
    constructor () {
      "ngInject";
      console.log(this);
    }
  }
};



if (module.hot) module.hot.accept('./fp-button.component.scss');
