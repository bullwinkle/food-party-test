import './fp-button.component.scss';
import template from './fp-button.html';

export const FpButtonComponent = {
  template,
  bindings: {
    buttonText: '<',
    buttonStateName: '<' // default, isLoading
  },
  controller: class FpButtonComponentController {
    constructor () {
      "ngInject";
      console.log(this);
    }

    $onChanges ({buttonText,buttonStateName}) {
      if (buttonText && !buttonText.currentValue) {
        this.buttonText = 'Click me!';
      }
      if (buttonStateName && !buttonStateName.currentValue) {
        this.buttonStateName = 'default';
      }
    }

    onButtonClick (e) {
      this.buttonStateName = this.buttonStateName === 'isLoading'
        ? 'default'
        : 'isLoading'
    }
  }
};



if (module.hot) module.hot.accept('./fp-button.component.scss');
