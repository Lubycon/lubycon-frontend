(function() {
    'use strict';

    angular
    .module('app')
    .run([
        'CookieService','$log','$rootScope','$location', 'USER_AGENT', 'Tracker',
        'StateAuthentication','Authentication','$state', 'HistoryService',
        runBlock
    ]);

    /** @ngInject */
    function runBlock(
            CookieService, $log, $rootScope, $location, USER_AGENT, Tracker,
            StateAuthentication, Authentication, $state, HistoryService
        ) {
        console.log($rootScope);

        // SET DEVICE INFO...
        $rootScope.deviceInfo = USER_AGENT;

        // DISABLED SCROLLING BY SPACE KEY
        disableScrollBySpace();

        // SET ROUTE INFO...
        $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
            fromState.params = fromParams;
            toState.params = toParams;

            HistoryService.push({
                from : fromState,
                to : toState
            });

            Tracker.post(toState, fromState);
        });

        $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams) {
            StateAuthentication.detect(toState);
            scrollToTop();
        });
    }

    function scrollToTop() {
        window.scrollTo(0,0);
    }

    function disableScrollBySpace() {
        window.onkeydown = function(event) {
            if(event.keyCode === 32 && event.target == document.body) {
                event.preventDefault();
                return false;
            }
        };
    }
})();
