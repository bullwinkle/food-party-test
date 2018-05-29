import 'styles/global.scss';
import {foodPartyModule} from './app/food-party.module';



try {
  window.angular.bootstrap(document.body, [foodPartyModule.name], {
    strictDi: true
  });
} catch (err) {
  console.warn('failed to load/bootstrap app', err);
}

if (process.env.ENV === 'development' ) {

	window._injector = (name) => {
		return angular.element(document.body).injector().get(name);
	}

}


console.warn('ENTRY: main');
