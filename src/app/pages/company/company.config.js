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

                },
                authenticate: 'all'
            })
            .state('common.noFooter.terms-of-service', {
                url: '/docs/terms',
                templateUrl: 'app/pages/company/termsOfService.tmpl.html',
                controller: 'DocsController',
                controllerAs: 'vm',
                authenticate: 'all'
            })
            .state('common.noFooter.private-policy', {
                url: '/docs/privatepolicy',
                templateUrl: 'app/pages/company/privatePolicy.tmpl.html',
                controller: 'DocsController',
                controllerAs: 'vm',
                authenticate: 'all'
            })
            ;
    }
})();
