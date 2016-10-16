(function() {
    'use strict';

    angular
        .module('app.pages.certification')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.noFooter.cert-signup', {
                url: '/certs/code?code',
                templateUrl: 'app/pages/certification/certification.tmpl.html',
                controller: 'CertCheckController',
                controllerAs: 'vm',
                params: {
                    code: null
                },
                resolve: {
                    getCodeTime: function(Restangular) {
                        return {
                            statue: {
                                code: '0000'
                            },
                            result : {
                                time: 21600
                            }
                        };
                        // return Restangular.all('certs/signup/time').customGET().then();
                    }
                }
            })
            .state('common.noFooter.cert-find-pwd', {
                url: '/certs/pwd/code?code',
                templateUrl: 'app/pages/certification/certification.tmpl.html',
                controller: 'PwdCertCheckController',
                controllerAs: 'vm',
                params: {
                    code: null
                },
                resolve: {
                    getCodeTime: function(Restangular) {
                        return {
                            statue: {
                                code: '0000'
                            },
                            result : {
                                time: 21600
                            }
                        };
                        // return Restangular.all('certs/signup/time').customGET().then();
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
