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
        <fp-home-page>
        
          <fp-button
            button-text="'Super button!'"
            button-state-name="'default'">
          </fp-button>
          
          <fp-input
            name="validation"
            ng-model="$parent.$ctrl.inputModel"
            fp-placeholder="Just english letters please"
            fp-validate-fn="$parent.$ctrl.validateInput(value)">
          </fp-input>
          
          <fp-media-element></fp-media-element>
          
        </fp-home-page>
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