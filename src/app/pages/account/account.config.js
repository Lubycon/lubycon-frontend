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
                authenticate: 'visitor'
            })
            .state('common.noFooter.signup', {
                url: '/signup',
                templateUrl: 'app/pages/account/signup.tmpl.html',
                controller: 'SignupController',
                controllerAs: 'vm',
                resolve: {
                    getData: function(Restangular) {
                        return Restangular.all('data').customGET('',{
                            country: 'country'
                        }).then();
                    }
                },
                authenticate: 'visitor'
            })
            .state('common.noFooter.signdrop', {
                url: '/signdrop',
                templateUrl: 'app/pages/account/signdrop.tmpl.html',
                controller: 'SigndropController',
                controllerAs: 'vm',
                authenticate: 'active'
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
                    getData: function() {
                        var api = Restangular.all('data').customGET({
                            country: 'country',
                            job: 'job'
                        }).then();
                    }
                },
                authenticate: 'active'
            })
            .state('common.default.findPassword', {
                url: '/findpassword',
                templateUrl: 'app/pages/certification/certification.tmpl.html',
                controller: 'FindPasswordController',
                controllerAs: 'vm',
                authenticate: 'active'
            })
            .state('common.noFooter.changePassword', {
                url: '/changePassword',
                templateUrl: 'app/pages/certification/certification.tmpl.html',
                controller: 'ChangePasswordController',
                controllerAs: 'vm',
                params: {
                    code: null
                },
                authenticate: 'active'
            })
            ;
    }
})();
