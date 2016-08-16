(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope,DeviceConfig) {
    console.log("APP RUNNING - ");
    console.log($rootScope);

    // SET DEVICE INFO...
    $rootScope.deviceInfo = DeviceConfig().get();

    // SET ROUTE INFO...
    $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
        $rootScope.clientLocation = {
            from : { url: fromState.url, params: fromParams },
            to : { url: toState.url, params: toParams }
        };
        console.log($rootScope.clientLocation);
    });

    $log.debug('runBlock end');
  }

})();
