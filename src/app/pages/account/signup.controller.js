(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SignupController', SignupController);

    /** @ngInject */
    function SignupController($rootScope, $scope, Restangular, Authentication, $state, toastr) {
        var vm = this;
        var api = Restangular.all('members/signup');

        vm.isMobile = $rootScope.deviceInfo.isMobile;

        vm.member = {
            email: null,
            nickname: null,
            password: null,
            country: null
        };
        vm.rePassword = null;
        vm.countryList = ['country A','country B','country C','country D'];

        vm.signup = signup;
        function signup(){
            var passwordCheck = vm.member.password === vm.rePassword;
            console.log('your request : ', vm.member);
            console.log('password matching : ', passwordCheck);
            console.log('http header : ',Restangular.defaultHeaders);
            if(passwordCheck && vm.member.country) {
                // TESTING....
                Restangular.all('members/signup').customPOST(
                    vm.member, undefined, undefined, {'Content-Type':'application/json'}
                ).then(function(res) {
                    console.log(res);
                    if(res.status.code === "0000") {
                        console.log("SIGN UP IS SUCCESS",res);
                        // $state.go('common.noFooter.signup-message',{ signupCheck: true });
                    }
                    else {
                        console.log('sign up is failed!!!!',res);
                    }
                });
                // TESTING...
            }
            else {
                toastr.error('패스워드 틀렸거나 국가 선택 안함',{

                });
            }
        }
    }
})();
