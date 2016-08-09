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
            templateUrl: '404.tmpl.html',
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
            templateUrl: '500.tmpl.html',
            controllerAs: 'vm',
            controller: function($state) {
                var vm = this;
                vm.goHome = function() {
                    $state.go('triangular.admin-default.dashboard-analytics');
                };
            }
        });

        $urlRouterProvider.otherwise('/main');
    }

})();
