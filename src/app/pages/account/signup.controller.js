(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SignupController', SignupController);

    /** @ngInject */
    function SignupController($rootScope, $scope, Restangular, Authentication) {
        var vm = this;
        var api = Restangular.all('members/signin');

        vm.isMobile = $rootScope.deviceInfo.isMobile;

        vm.member = {
            email: null,
            nickname: null,
            password: null,
            country: null
        };
        vm.rePassword = null;

        vm.signup = signup;
        function signup(){
            var passwordCheck = vm.member.password === vm.rePassword;
            console.log(Authentication,vm.member,passwordCheck);
            
            $state.go('common.noFooter.signup-message',{ signupCheck: true });
        }
    }
})();
