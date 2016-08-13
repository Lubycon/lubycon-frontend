(function() {
    'use strict';

    angular
        .module('error')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('full.default.404', {
                url: '/error/:errorCode',
                templateUrl: 'app/error/error.tmpl.html',
                controller: 'ErrorController',
                params: {
                    errorCode: null
                },
                controllerAs: 'vm',
            });
    }
})();
