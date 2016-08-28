(function() {
    'use strict';

    angular
        .module('app.pages.certification')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.noFooter.certCheck', {
                url: '/certs/code/:kind',
                templateUrl: 'app/pages/certification/certification.tmpl.html',
                controller: 'CertCheckController',
                controllerAs: 'vm',
                params: {
                    kind: null
                }
            })
            .state('common.noFooter.certPwd', {
                url: '/certs/pwd',
                templateUrl: 'app/pages/certification/certification.tmpl.html',
                controller: 'PwdCheckController',
                controllerAs: 'vm'
            })
            ;
    }
})();
