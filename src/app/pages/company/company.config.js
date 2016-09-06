(function() {
    'use strict';

    angular
        .module('app.pages.company')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.noFooter.aboutus', {
                url: '/aboutus',
                templateUrl: 'app/pages/company/aboutus.tmpl.html',
                controller: 'AboutUsController',
                controllerAs: 'vm',
                resolve: {
                    // getCreatorRsv: function($stateParams, Restangular) {
                    //     var api = Restangular.all('cretors');
                    //     return api.customGET().then();
                    // }
                }
            });
    }
})();
