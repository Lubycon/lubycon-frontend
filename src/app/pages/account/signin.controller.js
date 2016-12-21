(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SigninController', [
            '$rootScope', '$scope', '$state', '$filter',
            'Restangular', 'Authentication', 'toastr',
            'Base64Service', 'FacebookService', 'GoogleService',
            'SNS_NAME',
            SigninController
        ]);

    /** @ngInject */
    function SigninController(
        $rootScope, $scope, $state, $filter,
        Restangular, Authentication, toastr,
        Base64Service, FacebookService, GoogleService,
        SNS_NAME
    ) {
        var vm = this;

        vm.signInfo = {
            email: null,
            password: null,
            snsCode: null
        };

        vm._snsTemp = null;

        // PUBLIC METHOD

        vm.signin = signin;
        function signin(signType){
            if(signType === 'email') {
                vm.signInfo.snsCode = '0100';
                postData(vm.signInfo);
            }
            else if(signType === 'facebook') {
                FacebookService.get('userData').then(function(res) {
                    vm.signInfo.email = res.email;
                    vm.signInfo.password = Base64Service.encode(res.id);
                    vm.signInfo.snsCode = '0101';

                    vm._snsTemp = res;
                    vm._snsTemp.snsName = $filter('translate')('SNS_NAME.' + vm.signInfo.snsCode);

                    postData(vm.signInfo);
                });
            }
            else if(signType === 'google') {
                GoogleService.get('user').then(function(res) {
                    var userEmail = GoogleService.getPrimaryData(res.emailAddresses);

                    vm.signInfo.email = userEmail.value;
                    vm.signInfo.password = Base64Service.encode(userEmail.metadata.source.id);
                    vm.signInfo.snsCode = '0102';

                    vm._snsTemp = res;
                    vm._snsTemp.name = res.nicknames ?
                        GoogleService.getPrimaryData(res.nicknames).value :
                        GoogleService.getPrimaryData(res.names).displayName;

                    vm._snsTemp.locale = GoogleService.getPrimaryData(vm._snsTemp.locales).value;
                    vm._snsTemp.snsName = $filter('translate')('SNS_NAME.' + vm.signInfo.snsCode);

                    postData(vm.signInfo);
                });
            }
            else console.error('signType is not exist');
        }

        vm.snsSignin = snsSignin;
        function snsSignin() {
            console.log('SNS SIGN IN', generateSNSMemberData(SNS_NAME[vm.signInfo.snsCode]));

            Authentication.signUp.post(
                generateSNSMemberData(SNS_NAME[vm.signInfo.snsCode]),
                undefined, undefined, {'Content-Type':'application/json'})
            .then(function(res) {
                console.log(res);
                if(res.status.code === "0000") {
                    Authentication.setCredentials(res.result.token,'inactive');
                }
                else {
                    console.log('sign up is failed!!!!',res);
                }
            });
        }




        // PRIVATE METHOD

        function postData(data) {
            Authentication.signIn.post(
                data, undefined, undefined, {'Content-Type':'application/json'}
            ).then(function (res) {
                console.log(res);
                if(res.status.code === '0000') {
                    Authentication.setCredentials(res.result.token,res.result.condition);
                }
                else {
                    if(vm.signInfo.snsCode === '0100') { // EMAIL LOGIN
                        toastr.error($filter('translate')('ERROR.SIGNIN'));
                    }
                    else { // SNS LOGIN -> AUTOMATICALLY SIGNUP
                        angular.element('#snsLogin').modal();
                    }
                }
            });
        }

        function generateSNSMemberData(sns) {
            var output = {};

            switch(sns) {
                case 'facebook' :
                    output = {
                        email: vm.signInfo.email,
                        password: vm.signInfo.password,
                        snsCode: vm.signInfo.snsCode,
                        nickname: vm._snsTemp.name.replace(/\s/g,''),
                        country: vm._snsTemp.locale.split('_')[1],
                        newsletter: false
                    };
                break;
                case 'google' :
                    output = {
                        email: vm.signInfo.email,
                        password: vm.signInfo.password,
                        snsCode: vm.signInfo.snsCode,
                        nickname: vm._snsTemp.name.replace(/\s/g,''),
                        country: vm._snsTemp.locale.split('-')[1], // locale에 country값이 안들어옴. 확인할 것
                        newsletter: false
                    };
                break;
            }
            console.log(output);

            return output;
        }
    }
})();
