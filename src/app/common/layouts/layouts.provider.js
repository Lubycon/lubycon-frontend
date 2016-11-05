(function() {
    'use strict';

    angular
        .module('common')
        .run(['$rootScope', '$cookieStore', 'commonLayout', layoutRunner])
        .provider('commonLayout', layoutProvider);

    /* @ngInject */
    function layoutProvider() {
        this.$get = function() {

        }
    }

    /* @ngInject */
    function layoutRunner($rootScope, $cookieStore, commonLayout) {

    }
})();
