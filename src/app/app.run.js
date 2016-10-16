(function() {
    'use strict';

    angular
    .module('app')
    .run(runBlock);

    /** @ngInject */
    function runBlock($cookieStore, $log, $rootScope, $location, DeviceConfig, Authentication) {
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

            authenticate(toState);
        });

        function authenticate(toState) {
            console.log(toState,$rootScope);
            if(toState.authenticate === 'no-member' && $rootScope.memberState && $rootScope.memberState.sign) {
                console.log('only for visitor');
                $location.path('/main');
            }
            else if(toState.authenticate === 'member' && !$rootScope.memberState) {
                console.log('only for member');
                $location.path('/main');
            }
            else {
                setStateClassDOM(toState);
            }
        }

        function setStateClassDOM(toState) {
            var stateClass = toState.name
            .replace(/^(common|aside|full)\.(default|figure|noFooter)\./g,'state-')
            .replace(/(\.|\_)/gi,'-');


            angular.element('body').removeClass().addClass(stateClass);
        }
    }
})();
