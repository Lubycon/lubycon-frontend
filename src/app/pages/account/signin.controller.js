(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SigninController', SigninController);

    /** @ngInject */
    function SigninController($rootScope, $scope, Restangular, Authentication) {
        var vm = this;
        var api = Restangular.all('members/signin');

        vm.isMobile = $rootScope.deviceInfo.isMobile;

        vm.memberId = null;
        vm.password = null;

        vm.signin = signin;
        function signin(){
            console.log(Authentication);
        }
    }
})();
