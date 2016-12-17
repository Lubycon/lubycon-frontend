(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SignupController', [
            '$rootScope', '$scope', 'Restangular', 'Authentication', '$state', 'toastr',
            'FormValidateService', '$translate',
            'getData',
            SignupController
        ]);

    /** @ngInject */
    function SignupController(
        $rootScope, $scope, Restangular, Authentication, $state, toastr,
        FormValidateService, $translate,
        getData
    ) {
        var vm = this;

        vm.isMobile = $rootScope.deviceInfo.isMobile;

        vm.selectBoxOptions = {
            containerCssClass: 'full-width'
        };

        vm.init = (init)();
        function init() {
            vm.member = {
                email: null,
                nickname: null,
                password: null,
                country: null,
                snsCode: '0100',
                newsletter: false
            };

            vm.agree = {
                terms: false,
                privatePolicy: false
            };

            vm.validator = {
                email: {
                    pattern: FormValidateService.getCondition('email').pattern
                },
                password: {
                    minlength: FormValidateService.getCondition('password').minlength,
                    maxlength: FormValidateService.getCondition('password').maxlength,
                    pattern: FormValidateService.getCondition('password').pattern
                },
                nickname: {
                    minlength: FormValidateService.getCondition('nickname').minlength,
                    maxlength: FormValidateService.getCondition('nickname').maxlength,
                    pattern: FormValidateService.getCondition('nickname').pattern
                }
            };

            vm.rePassword = null;
            vm.countryList = getData.result.country;
            vm.signup = signup;
        }

        function signup(){
            console.log(vm.member);
            var passwordCheck = vm.member.password === vm.rePassword;

            if(validator()) {
                Authentication.signUp.post(
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
