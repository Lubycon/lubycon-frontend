(function() {
    'use strict';

    angular
        .module('app.pages.test')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.default.test', {
                url: '/test',
                templateUrl: 'app/pages/_test/test.tmpl.html',
                controller: 'TestController',
                controllerAs: 'vm',
                resolve: {

                },
                authenticate: 'all'
            });
    }
})();
