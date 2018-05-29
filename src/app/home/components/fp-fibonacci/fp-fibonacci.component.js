import './fp-fibonacci.component.scss';
import template from './fp-fibonacci.html';

export const FpFibonacciComponent = {
  template,
  bindings: {},
  controller: class FpFibonacciComponentController {
    constructor ($interval) {
      "ngInject";
      console.log(this);
      this.$interval = $interval;
      this.endValue = 0;
      this.currentValue = 10;
    }

    startCounting () {
      this.startCounting.interval = this.$interval(()=>{
        const f = this.gitNextFibonacci(this.currentValue-0);
        console.log(f)
        this.currentValue = f;
      },1000)
    }

    gitNextFibonacci (num) {
      var a = 1, b = 0, temp;

      while (num >= 0){
        temp = a;
        a = a + b;
        b = temp;
        num--;
      }

      return b;
    }
  }
};



if (module.hot) module.hot.accept('./fp-fibonacci.component.scss');
