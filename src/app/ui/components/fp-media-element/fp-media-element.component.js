import './fp-media-element.component.scss';
import template from './fp-media-element.html';

export const FpMediaElementComponent = {
  template,
  bindings: {},
  controller: class FpMediaElementComponentController {
    constructor ($interval) {
      "ngInject";
      this.$interval = $interval;
      console.log(this);
    }

    $onInit () {
      this.updateImage();
    }

    onImageClick (e) {
      console.log(e);
      this.updateImage();
    }

    updateImage () {
      this.imageSrc = `https://picsum.photos/300/200/?random&${Date.now()}`
    }
  }
};



if (module.hot) module.hot.accept('./fp-media-element.component.scss');
