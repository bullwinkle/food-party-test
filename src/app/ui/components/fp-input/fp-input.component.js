import './fp-input.component.scss';
import template from './fp-input.html';

export const FpInputComponent = {
  template,
  require: {
    ngModelCtrl: "ngModel"
  },
  bindings: {
    ngModel: "=",
    fpValidateFn: '&',
    fpPlaceholder: '@'
  },
  controller: class FpInputComponentController {
    constructor () {
      "ngInject";
      console.log(this);
    }

    $onInit () {
      this.ngModelCtrl.$parsers.unshift((value='') => {
        const isValid = this.validateInput({value});
        this.ngModelCtrl.$setValidity('valid', isValid);
        return isValid ? value : undefined;
      });

      this.ngModelCtrl.$formatters.unshift((value='') => {
        const isValid = this.validateInput({value});
        this.ngModelCtrl.$setValidity('valid', isValid);
        return value;
      });
    }

    validateInput ({value}) {
      if (!value) return true;
      return this.fpValidateFn({value});
    }

  }
};


if (module.hot) module.hot.accept('./fp-input.component.scss');
