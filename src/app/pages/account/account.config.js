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
                controllerAs: 'vm',
                authenticate: 'no-member'
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
                },
                authenticate: 'no-member'
            })
            .state('common.noFooter.signdrop', {
                url: '/signdrop',
                templateUrl: 'app/pages/account/signdrop.tmpl.html',
                controller: 'SigndropController',
                controllerAs: 'vm',
                authenticate: 'member'
            })
            .state('common.default.accountSetting', {
                url: '/setting/:memberId',
                templateUrl: 'app/pages/account/setting.tmpl.html',
                controller: 'AccountSettingController',
                controllerAs: 'vm',
                params: {
                    memberId: null
                },
                resolve: {
                    getMember: function(Restangular, $stateParams) {
                        var api = Restangular.all('members/detail/'+$stateParams.memberId);
                        return api.customGET().then();
                    },
                    getCountry: function($http) {
                        return $http.get('/data/country.json').then();
                    },
                    getJob: function($http) {
                        return $http.get('/data/job.json').then();
                    }
                },
                authenticate: 'member'
            })
            .state('common.default.findPassword', {
                url: '/findpassword',
                templateUrl: 'app/pages/certification/certification.tmpl.html',
                controller: 'FindPasswordController',
                controllerAs: 'vm'
            })
            ;
    }
})();
