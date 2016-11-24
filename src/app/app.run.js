(function() {
    'use strict';

    angular
    .module('app')
    .run([
        'CookieService','$log','$rootScope','$location',
        'DeviceConfig','StateAuthentication','Authentication','$state',
        runBlock
    ]);

    /** @ngInject */
    function runBlock(
            CookieService, $log, $rootScope, $location,
            DeviceConfig, StateAuthentication, Authentication, $state
        ) {
        console.log("APP RUNNING - ");
        console.log($rootScope);

        // SET DEVICE INFO...
        $rootScope.deviceInfo = DeviceConfig().get();

        // SET ROUTE INFO...
        $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
            console.log(toParams);
            fromState.params = fromParams;
            toState.params = toParams;

            $rootScope.clientLocation = {
                from : fromState,
                to : toState
            };
        });

        $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams) {
            StateAuthentication.detect(toState);
        });
    }
})();
