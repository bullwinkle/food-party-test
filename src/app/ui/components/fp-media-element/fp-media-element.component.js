import styles from './fp-media-element.component.scss';
import template from './fp-media-element.html';

export const FpMediaElementComponent = {
  template,
  styles,
  bindings: {},
  controller: class FpMediaElementComponentController {
    constructor () {
      "ngInject";
      console.log(this);
    }
  }
};



if (module.hot) module.hot.accept('./fp-media-element.component.scss');
