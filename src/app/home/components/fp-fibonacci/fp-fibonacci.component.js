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
      this.fibonacciSequence = [];
    }

    startCounting () {
      let num = 0;
      this.fibonacciSequence = [];
      this.startCounting.interval = this.$interval(()=>{
        const next = this.gitNextFibonacci(num++);
        if (next >= this.endValue) {
          return this.$interval.cancel(this.startCounting.interval);
        }
        this.fibonacciSequence.push(next);
      },1000)
    }

    gitNextFibonacci (num) {
      if (num <= 1) return 1;

      return this.gitNextFibonacci(num - 1) + this.gitNextFibonacci(num - 2);
    }
  }
};



if (module.hot) module.hot.accept('./fp-fibonacci.component.scss');
