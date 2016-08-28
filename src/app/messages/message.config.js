(function() {
    'use strict';

    angular
        .module('messages')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.noFooter.signup-message', {
                url: '/message/signup',
                templateUrl: 'app/messages/message.tmpl.html',
                controller: 'SignupMessageController',
                controllerAs: 'vm',
                params: {
                    success: null
                }
            })
            .state('common.noFooter.content-message', {
                url: '/message/contents',
                templateUrl: 'app/messages/message.tmpl.html',
                controller: 'ContentsMessageController',
                controllerAs: 'vm',
                params: {
                    success: null,
                    kind: null
                }
            })
            .state('common.noFooter.setting-message', {
                url: '/message/setting',
                templateUrl: 'app/messages/message.tmpl.html',
                controller: 'SettingMessageController',
                controllerAs: 'vm',
                params: {
                    success: null
                }
            })
            .state('common.noFooter.change-pwd-message', {
                url: '/message/pwdsetting',
                templateUrl: 'app/messages/message.tmpl.html',
                controller: 'pwdMessageController',
                controllerAs: 'vm',
                params: {

                }
            })
            .state('common.noFooter.fail-cert-message', {
                url: '/message/certs/fail',
                templateUrl: 'app/messages/message.tmpl.html',
                controller: 'FailCertMessageController',
                controllerAs: 'vm',
                params: {

                }
            })
            ;
    }
})();
