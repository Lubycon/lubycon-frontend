(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.noFooter.signin', {
                url: '/signin',
                templateUrl: 'app/pages/account/signin.tmpl.html',
                controller: 'SigninController',
                controllerAs: 'vm'
            })
            .state('common.noFooter.signup', {
                url: '/signup',
                templateUrl: 'app/pages/account/signup.tmpl.html',
                controller: 'SignupController',
                controllerAs: 'vm'
            });
    }
})();
