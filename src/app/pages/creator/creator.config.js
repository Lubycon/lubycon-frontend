(function() {
    'use strict';

    angular
        .module('app.pages.creator')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.default.creator', {
                url: '/creator',
                templateUrl: 'app/pages/creator/creator.tmpl.html',
                controller: 'CreatorController',
                controllerAs: 'vm',
                params: {
                    category: null
                },
                resolve: {
                    // getCreatorRsv: function($stateParams, Restangular) {
                    //     var api = Restangular.all('cretors');
                    //     return api.customGET().then();
                    // }
                }
            });
    }
})();
