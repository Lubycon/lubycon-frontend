(function() {
    'use strict';

    angular
    .module('app')
    .run([
        'CookieService','$log','$rootScope','$location', 'USER_AGENT', 'Tracker',
        'StateAuthentication','Authentication','$state', 'HistoryService', '$anchorScroll',
        'AppSettingService',
        runBlock
    ]);

    /** @ngInject */
    function runBlock(
            CookieService, $log, $rootScope, $location, USER_AGENT, Tracker,
            StateAuthentication, Authentication, $state, HistoryService, $anchorScroll,
            AppSettingService
        ) {
        console.log('$rootScope : ', $rootScope);

        // SET DEVICE INFO...
        $rootScope.deviceInfo = USER_AGENT;

        // SET APP SETTING...
        AppSettingService.init();

        // DISABLED SCROLLING BY SPACE KEY
        disableScrollBySpace();

        // SET ROUTE INFO...
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
            // HIDE MODAL IN PREV PAGE
            hideModalWindow();
        });

        $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams) {

            fromState.params = fromParams;
            toState.params = toParams;
            fromState = generateURL(fromState);
            toState = generateURL(toState);

            HistoryService.push({
                from : fromState,
                to : toState
            });

            Tracker.post(toState, fromState);
            StateAuthentication.detect(toState);

            $anchorScroll();
        });
    }

    function disableScrollBySpace() {
        window.onkeydown = function(event) {
            if(event.keyCode === 32 && event.target == document.body) {
                event.preventDefault();
                return false;
            }
        };
    }

    function hideModalWindow() {
        angular.element('.modal[role="dialog"]').modal('hide');
        angular.element('body').removeClass('modal modal-open');
        angular.element('.modal-backdrop').remove();
    }

    function generateURL(param) {
        var key = Object.keys(param.params),
            url = url === '^' ? document.referrer : param.url;

        url = url.replace(/\:/g,'');
        key.forEach(function(v) {
            url = url.replace(v,param.params[v]);
        });

        param.url = url;

        return param;
    }
})();
