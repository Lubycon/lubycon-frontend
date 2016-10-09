(function() {
    'use strict';

    angular
        .module('messages')
        .controller('CertCheckController', CertCheckController);

    /* @ngInject */
    function CertCheckController(
        $rootScope, $scope, $location, $state,
        $timeout, $stateParams, $translate,
        Restangular
    ) {
        var vm = this;

        vm.message = {
            animation: 'bounceInDown',
            icon: 'fa-lock',
            iconColor: 'black',
            iconAnimation: '',
            title: 'Certification',
            content: 'Please insert your certification code.',
            inputLabel: 'Code',
            inputType: 'text',
            buttons: [{
                kind: 'submit-bt',
                type: 'submit',
                func: null,
                content: 'SUBMIT'
            }]
        };

        vm.inputCode = null;
        vm.success = $stateParams.success;
        vm.kind = $stateParams.kind;
        vm.submit = submit;

        vm.validateCode = location.href.split('?code=')[1];
        vm.isValidate = !angular.isUndefined(vm.validateCode);
        console.log(vm.isValidate,vm.validateCode);

        vm.time = 21600; // seconds

        function submit() {
            console.log(vm.inputCode);
            Restangular.all('certs/signup/code').customPOST(
                {code: vm.inputCode},
                undefined,
                undefined,
                {'Content-Type': 'application/json'}
            ).then(function(res) {
                console.log(res);
                if(res.status.code === '0000') {
                    if(res.result.validity) {
                        // 인증 성공
                    }
                    else {
                        // 인증 실패
                    }
                }
                else {
                    // 전송 실패
                }
            });
        }
    }
})();
