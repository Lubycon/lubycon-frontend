(function() {
    'use strict';

    angular
        .module('common')
        .run(layoutRunner)
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
