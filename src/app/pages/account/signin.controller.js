(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SigninController', SigninController);

    /** @ngInject */
    function SigninController($rootScope, $scope, Restangular, Authentication) {
        var vm = this;

        vm.signInfo = {
            email: null,
            password: null,
            snsCode: null,
            os: null,
            modelInfo: $rootScope.deviceInfo.detail
        };

        vm.signin = signin;
        function signin(){
            console.log(Authentication,vm.signInfo);

            Authentication.signIn.post(
                vm.signInfo, undefined, undefined, {'Content-Type':'application/json'}
            ).then(function (res) {
                console.log(res);
                Authentication.setCredentials(res.token,'reload');
            });
        }
    }
})();
