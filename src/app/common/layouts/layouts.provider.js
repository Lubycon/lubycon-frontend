(function() {
    'use strict';

    angular
        .module('common')
        .run(['$rootScope', 'CookieService', 'commonLayout', layoutRunner])
        .provider('commonLayout', layoutProvider);

    /* @ngInject */
    function layoutProvider() {
        this.$get = function() {

        }
    }

    /* @ngInject */
    function layoutRunner($rootScope, CookieService, commonLayout) {

    }
})();
