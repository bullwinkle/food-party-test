export function onGplansRun (
  $transitions
) {
  "ngInject";

  const isLog = true;

  $transitions.onCreate ( {}, function(transition) {
    isLog && console.warn('[transition onCreate ]',transition.from(),transition.to())
  });
  $transitions.onBefore( {}, function(transition) {
    isLog && console.warn('[transition onBefore]',transition.from(),transition.to())
    ModalsService.closeAll('modal closed before navigation');
  });
  $transitions.onStart( {}, function(transition) {
    isLog && console.warn('[transition onStart]',transition.from(),transition.to())
  });
  $transitions.onEnter ( {}, function(transition) {
    isLog && console.warn('[transition onEnter ]',transition.from(),transition.to())
  });
  $transitions.onFinish ( {}, function(transition) {
    isLog && console.warn('[transition onFinish ]',transition.from(),transition.to())
  });
  $transitions.onRetain ( {}, function(transition) {
    isLog && console.warn('[transition onRetain ]',transition.from(),transition.to())
  });
  $transitions.onExit ( {}, function(transition) {
    isLog && console.warn('[transition onExit ]',transition.from(),transition.to())
  });
  $transitions.onSuccess( {}, function(transition) {
    isLog && console.warn('[transition onSuccess]',transition.from(),transition.to());
    $rootScope.isSidebarMobile = false; //close sidebar on mobile
  });
  $transitions.onError ( {}, function(transition) {
    isLog && console.warn('[transition onError ]',transition.from(),transition.to())
  });

}
