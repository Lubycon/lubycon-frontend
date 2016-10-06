(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SignupController', SignupController);

    /** @ngInject */
    function SignupController(
        $rootScope, $scope, Restangular, Authentication, $state, toastr,
        getCountry
    ) {
        var vm = this;
        var api = Authentication.signUp;

        vm.isMobile = $rootScope.deviceInfo.isMobile;

        vm.member = {
            email: null,
            nickname: null,
            password: null,
            country: null
        };
        vm.rePassword = null;
        vm.countryList = getCountry.data;
        vm.signup = signup;

        function signup(){
            console.log(vm.member);
            var passwordCheck = vm.member.password === vm.rePassword;

            if(passwordCheck && vm.member.country) {
                api.post(
                    vm.member, undefined, undefined, {'Content-Type':'application/json'}
                ).then(function(res) {
                    console.log(res);
                    if(res.status.code === "0000") {
                        $state.go('common.noFooter.certCheck',{ kind: 'signup' });
                    }
                    else {
                        console.log('sign up is failed!!!!',res);
                    }
                });
            }
            else {
                toastr.error('패스워드 틀렸거나 국가 선택 안함');
            }
        }
    }
})();
