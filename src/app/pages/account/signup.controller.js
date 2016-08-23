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

        vm.memberId = null;
        vm.password = null;

        vm.signup = signup;
        function signup(){
            console.log(Authentication);
        }
    }
})();
