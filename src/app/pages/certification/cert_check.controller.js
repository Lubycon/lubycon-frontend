(function() {
    'use strict';

    angular
        .module('app.pages.certification')
        .controller('CertCheckController', [
            '$rootScope', '$scope', '$location', '$state',
            '$timeout', '$stateParams', '$translate',
            'Restangular', 'Authentication', 'toastr', 'getCodeTime',
            CertCheckController
        ]);

    /* @ngInject */
    function CertCheckController(
        $rootScope, $scope, $location, $state,
        $timeout, $stateParams, $translate,
        Restangular, Authentication, toastr,
        getCodeTime
    ) {
        var vm = this;

        vm.code = $stateParams.code;
        vm.message = {
            animation: 'bounceInDown',
            icon: 'fa-lock',
            iconColor: 'black',
            iconAnimation: '',
            title: 'Certification',
            content: 'Please insert your certification code.',
            inputs: [{
                label: 'Code',
                type: 'code',
                model: vm.code
            }],
            buttons: [{
                kind: 'resend-bt',
                type: 'button',
                method: resendMail,
                content: 'RESEND'
            },{
                kind: 'submit-bt',
                type: 'submit',
                method: null,
                content: 'SUBMIT'
            }],
            timer: true
        };

        vm.submit = submit;
        // AUTOMATICALLY SUBMIT
        if(vm.code) vm.submit();

        vm.success = $stateParams.success;
        vm.kind = $stateParams.kind;

        vm.isValidate = !angular.isUndefined(vm.code);
        vm.time = getCodeTime.result.time; // seconds

        function resendMail() {
            console.log('resendMail');
            Restangular.all('/mail/signup').customPUT(
                {data: ''}
            ).then(function(res) {
                console.log(res);
            });
        }


        function submit() {
            console.log(vm.code);
            vm.code = vm.message.inputs[0].model;

            Restangular.all('certs/signup/code').customPOST(
                {code: vm.code},
                undefined,
                undefined,
                {'Content-Type': 'application/json'}
            ).then(function(res) {
                console.log(res.result);
                if(res.status.code === '0000') {
                    if(res.result.validity) {
                        var token = Restangular.defaultHeaders['X-lubycon-Token'];
                        $state.go('common.noFooter.signupMessage',{success: true});
                        Authentication.updateCredentials('active');
                    }
                    else {
                        toastr.error('토큰이 잘못되었습니다.');
                    }
                }
                else {
                    // 전송 실패
                }
            });
        }
    }
})();
