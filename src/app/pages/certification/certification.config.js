(function() {
    'use strict';

    angular
        .module('app.pages.certification')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.noFooter.cert', {
                url: '/certs/code/:type?code',
                templateUrl: 'app/pages/certification/certification.tmpl.html',
                controller: 'CertCheckController',
                controllerAs: 'vm',
                params: {
                    code: null,
                    type: null
                },
                resolve: {
                    getCodeTime: function(Restangular,$stateParams) {
                        return {
                            statue: {
                                code: '0000'
                            },
                            result : {
                                time: 21600
                            }
                        };
                        // return Restangular.all('certs/' + $stateParmas.type + '/time').customGET().then();
                    }
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
