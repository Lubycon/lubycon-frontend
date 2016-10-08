(function() {
    'use strict';

    angular
        .module('app.pages.certification')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.noFooter.cert-check', {
                url: '/certs/code/:kind',
                templateUrl: 'app/pages/certification/certification.tmpl.html',
                controller: 'CertCheckController',
                controllerAs: 'vm',
                params: {
                    kind: null
                }
            })
            .state('common.noFooter.cert-pwd', {
                url: '/certs/pwd',
                templateUrl: 'app/pages/certification/certification.tmpl.html',
                controller: 'PwdCheckController',
                controllerAs: 'vm'
            })
            ;
    }
})();
