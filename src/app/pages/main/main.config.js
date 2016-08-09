(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.default.main', {
                url: '/main',
                templateUrl: 'app/pages/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm',
                data: {
                    css: 'app/pages/main/main.sass'
                }
            });
    }
})();
