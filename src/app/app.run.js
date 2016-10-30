(function() {
    'use strict';

    angular
    .module('app')
    .run([
        '$cookieStore','$log','$rootScope','$location',
        'DeviceConfig','Authentication','$state', '$timeout',
        runBlock
    ]);

    /** @ngInject */
    function runBlock(
            $cookieStore, $log, $rootScope, $location,
            DeviceConfig, Authentication, $state, $timeout
        ) {
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
            var isSigned = $rootScope.memberState && $rootScope.memberState.sign,
                condition = $rootScope.memberState.condition;

            console.log('PAGE AUTHENTICATE -> ',toState,'isSigned : ',isSigned,'condition : ',condition);


            switch(toState.authenticate) {
                case 'all' :
                    setStateClassDOM(toState);
                break;
                case 'inactive' :
                    if(isSigned) setStateClassDOM(toState);
                    else stateChangeRejected();
                break;
                case 'active' :
                    if(isSigned && condition === 'active') setStateClassDOM(toState);
                    else stateChangeRejected('common.noFooter.cert',{type: 'signup'});
                break;
                case 'visitor' :
                    if(!isSigned) setStateClassDOM(toState);
                    else stateChangeRejected('common.figure.main');
                break;
                case 'admin' :
                    if(isSigned && condition === 'admin') setStateClassDOM(toState);
                    else stateChangeRejected('common.figure.main');
                break;
                case 'not-allowed' :
                    stateChangeRejected('full.noFooter.error',{ errorCode: '404' });
                break;
                default: setStateClassDOM(toState); break;
            }
        }

        function stateChangeRejected(target,param) {
            $timeout(function() {
                if(!target) $state.go('common.noFooter.signin');
                else $state.go(target,param);
            });
        }

        function setStateClassDOM(toState) {
            var stateClass = toState.name
            .replace(/^(common|aside|full)\.(default|figure|noFooter)\./g,'state-')
            .replace(/(\.|\_)/gi,'-');


            angular.element('body').removeClass().addClass(stateClass);
        }
    }
})();
