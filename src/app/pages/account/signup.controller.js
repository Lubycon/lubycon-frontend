(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SignupController', [
            '$rootScope', '$scope', 'Restangular', 'Authentication', '$state', 'toastr',
            'getData',
            SignupController
        ]);

    /** @ngInject */
    function SignupController(
        $rootScope, $scope, Restangular, Authentication, $state, toastr,
        getData
    ) {
        var vm = this;
        var api = Authentication.signUp;

        vm.selectBoxOptions = {
            containerCssClass: 'full-width',
            placeholder: '국가를 선택하세요'
        };

        vm.isMobile = $rootScope.deviceInfo.isMobile;
        vm.member = {
            email: null,
            nickname: null,
            password: null,
            country: null,
            snsCode: '0100',
            newsletter: false
        };
        vm.rePassword = null;
        vm.countryList = getData.result.country;
        vm.signup = signup;

        vm.agree = {
            terms: false,
            privatePolicy: false
        };

        function signup(){
            console.log(vm.member);
            var passwordCheck = vm.member.password === vm.rePassword;

            if(validator()) {
                api.post(
                    vm.member, undefined, undefined, {'Content-Type':'application/json'}
                ).then(function(res) {
                    console.log(res);
                    if(res.status.code === "0000") {
                        Authentication.setCredentials(res.result.token,'inactive');
                    }
                    else {
                        console.log('sign up is failed!!!!',res);
                    }
                });
            }
        }

        function validator() {
            var checkCountry = !angular.isUndefined(vm.member.country) || vm.member.country !== null,
                checkPassword = vm.member.password === vm.rePassword,
                checkTerms = vm.agree.terms,
                checkPrivatePolicy = vm.agree.privatePolicy;
            var validate = checkCountry && checkPassword && checkTerms && checkPrivatePolicy;
            var message = null;

            if(validate) return true;
            else {
                if(!checkCountry) message = '국가를 선택하세요';
                else if(!checkPassword) message = '패스워드를 확인하세요';
                else if(!checkTerms) message = '운영정책을 읽어보시고 필수항목에 동의하세요';
                else if(!checkPrivatePolicy) message = '개인정보이용정책을 읽어보시고 필수항목에 동의하세요';
                else message = '';

                toastr.error(message);
                return false;
            }
        }
    }
})();
