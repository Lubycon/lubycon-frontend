(function() {
    'use strict';

    angular
    .module('app')
    .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: 'app/pages/error/404.tmpl.html',
            controllerAs: 'vm',
            controller: function($state) {
                var vm = this;
                vm.goHome = function() {
                    $state.go('triangular.admin-default.dashboard-analytics');
                };
            }
        })
        .state('500', {
            url: '/500',
            templateUrl: 'app/pages/error/500.tmpl.html',
            controllerAs: 'vm',
            controller: function($state) {
                var vm = this;
                vm.goHome = function() {
                    $state.go('triangular.admin-default.dashboard-analytics');
                };
            }
        });

        // set default routes when no path specified
        $urlRouterProvider.when('', '/main');
        $urlRouterProvider.when('/', '/main');
        $urlRouterProvider.when('/home', '/main');
        $urlRouterProvider.when('/home/', '/main');

        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/404');
    }

})();
