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
                controllerAs: 'vm',
                resolve: {
                    getCountry: function($http) {
                        return $http.get('/data/country.json').then();
                    }
                }
            })
            .state('common.noFooter.signdrop', {
                url: '/signdrop',
                templateUrl: 'app/pages/account/signdrop.tmpl.html',
                controller: 'SigndropController',
                controllerAs: 'vm'
            })
            .state('common.default.accountSetting', {
                url: '/setting',
                templateUrl: 'app/pages/account/setting.tmpl.html',
                controller: 'AccountSettingController',
                controllerAs: 'vm',
                resolve: {
                    getCountry: function($http) {
                        return $http.get('/data/country.json').then();
                    },
                    getJob: function($http) {
                        return $http.get('/data/job.json').then();
                    }
                }
            })
            ;
    }
})();
