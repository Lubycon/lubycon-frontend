(function () {
    'use strict';

    angular
        .module('app')
        .factory('StateAuthentication', [
            '$rootScope','$state','$timeout',StateAuthentication
        ]);

    function StateAuthentication($rootScope, $state, $timeout) {

        var service = {
            detect: detect
        };

        return service;

        // PUBLIC
        function detect(toState) {
            var isSigned = $rootScope.memberState && $rootScope.memberState.sign,
                condition = $rootScope.memberState.condition;

            console.log('PAGE AUTHENTICATE -> ',toState,'isSigned : ',isSigned,'condition : ',condition);

            switch(toState.authenticate) {
                case 'all' :
                    stateChangeResolve(toState);
                break;
                case 'inactive' :
                    if(isSigned) stateChangeResolve(toState);
                    else stateChangeReject();
                break;
                case 'active' :
                    if(isSigned && condition === 'active') stateChangeResolve(toState);
                    else stateChangeReject('common.noFooter.cert',{type: 'signup'});
                break;
                case 'visitor' :
                    if(!isSigned) stateChangeResolve(toState);
                    else stateChangeReject('common.figure.main');
                break;
                case 'admin' :
                    if(isSigned && condition === 'admin') stateChangeResolve(toState);
                    else stateChangeReject('common.figure.main');
                break;
                case 'not-allowed' :
                    stateChangeReject('full.noFooter.error',{ errorCode: '404' });
                break;
                default: stateChangeResolve(toState); break;
            }
        }

        // PRIVATE
        function stateChangeReject(target,param) {
            $timeout(function() {
                if(!target) $state.go('common.noFooter.signin');
                else $state.go(target,param);
            });
        }

        function stateChangeResolve(toState) {
            var stateClass = toState.name
            .replace(/^(common|aside|full)\.(default|figure|noFooter)\./g,'state-')
            .replace(/(\.|\_)/gi,'-');

            angular.element('body').removeClass().addClass(stateClass);
        }
    }
})();
