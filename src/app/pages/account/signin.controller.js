(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SigninController', SigninController);

    /** @ngInject */
    function SigninController($rootScope, $scope, $state, Restangular, Authentication, toastr) {
        var vm = this;

        vm.signInfo = {
            email: null,
            password: null,
            snsCode: '0100',
            modelInfo: $rootScope.deviceInfo.detail
        };
        console.log($rootScope.deviceInfo,$rootScope);
        vm.signin = signin;
        function signin(){
            console.log(vm.signInfo);

            Authentication.signIn.post(
                vm.signInfo, undefined, undefined, {'Content-Type':'application/json'}
            ).then(function (res) {
                console.log(res);
                if(res.status.code === '0000') {
                    Authentication.setCredentials(res.result.token,res.result.condition);
                }
                else {
                    toastr.error('로그인 실패 ' + '(' + res.status.code + ')');
                }
            });
        }
    }
})();
