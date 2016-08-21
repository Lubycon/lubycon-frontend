(function() {
    'use strict';

    angular
        .module('app.pages.member')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('aside.default.dashboard', {
                url: '/creator/dashboard/:memberId',
                views: {
                    content: {
                        templateUrl: 'app/pages/member/dashboard.tmpl.html',
                        controller: 'DashboardController',
                        controllerAs: 'vm'
                    },
                    aside: {
                        templateUrl: 'app/pages/member/aside.tmpl.html',
                        controller: 'MemberAsideController',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    memberId: null
                },
                resolve: {
                    // getDashboardRsv: function($stateParams, Restangular) {
                    //     var api = Restangular.all('cretors/dashboard' + $stateParams.memberId);
                    //     return api.customGET().then();
                    // }
                }
            });
    }
})();
