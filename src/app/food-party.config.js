export function configureFoodPartyModule( $locationProvider, $urlMatcherFactoryProvider) {
  "ngInject";

  $urlMatcherFactoryProvider.strictMode(false);
  $locationProvider.html5Mode(true);
}