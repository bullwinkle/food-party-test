console.warn('ENTRY: main');

window.addEventListener('load',()=>{
	const containerEl = document.getElementById('app-container');
  containerEl.innerHTML = 'LOADED!'
});


if (process.env.ENV === 'development' ) {

	window._injector = (name) => {
		return angular.element(document.body).injector().get(name);
	}

}
