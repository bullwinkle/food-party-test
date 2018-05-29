export function configureFoodPartyRouter($stateProvider) {
  "ngInject";

  $stateProvider

  /**
   * GLOBAL APP STATES
   */

    .state('foodParty', {
      abstract: true,
      component: 'fpAppComponent'
    })

    .state('foodParty.index', {
      url: '/',
      template: `
        <fp-button-component
          button-text="'Super button!'"
          button-state-name="'default'">
        </fp-button-component>
        
        <fp-input-component></fp-input-component>
        <fp-media-element-component></fp-media-element-component>
      `
    })


    .state('foodParty.notFound', {
      url: '*notFoundPath',
      params: {notFoundPath: {value: '/any-path', squash: true}},
      views: {
        $default: {
          template: '<h1>404 - not found</h1>'
        }
      },
      onEnter: ($stateParams) => {
        "ngInject";
        console.warn('not found', $stateParams.notFoundPath)
      },
    })
  ;
}