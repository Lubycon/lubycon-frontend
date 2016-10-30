(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.figure.main', {
                url: '/main',
                templateUrl: 'app/pages/main/main.tmpl.html',
                controller: 'MainController',
                controllerAs: 'vm',
                resolve: {
                    getMainRsv: function($stateParams, Restangular) {
                        // var api = Restangular.all('main');
                        // return api.customGET().then();
                    }
                },
                authenticate: 'all'
            });
    }
})();
