(function() {
    'use strict';

    angular
    .module('app')
    .config([
        '$stateProvider', '$urlRouterProvider', routerConfig
    ]);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        // SET DEFAULT ROUTE
        $urlRouterProvider.when('', '/main');
        $urlRouterProvider.when('/', '/main');
        $urlRouterProvider.when('/home', '/main');
        $urlRouterProvider.when('/home/', '/main');

        // PAGE IS NOT FOUND
        $urlRouterProvider.otherwise('/error/404');
    }

})();
