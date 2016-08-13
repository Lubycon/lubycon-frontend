(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.default.community', {
                url: '/community/:category',
                templateUrl: 'app/pages/community/community.tmpl.html',
                controller: 'CommunityController',
                controllerAs: 'vm',
                params: {
                    category: null
                },
                resolve: {
                    // getCommunityRsv: function($stateParams, Restangular) {
                    //     var api = Restangular.all('community/'+ $stateParams.category);
                    //     return api.customGET().then();
                    // }
                }
            });
    }
})();
