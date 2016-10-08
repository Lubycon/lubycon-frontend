(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($cookieStore, $log, $rootScope, DeviceConfig, Authentication) {
    console.log("APP RUNNING - ");
    console.log($rootScope);

    // SET DEVICE INFO...
    $rootScope.deviceInfo = DeviceConfig().get();

    // SET ROUTE INFO...
    $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
        $rootScope.clientLocation = {
            from : fromState,
            to : toState
        };
        
        var stateClass = toState.name
            .replace(/^(common|aside|full)\.(default|figure|noFooter)\./g,'state-')
            .replace(/(\.|\_)/gi,'-');


        angular.element('body').removeClass().addClass(stateClass);
    });
  }

})();
