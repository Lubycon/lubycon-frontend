(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('ChangePasswordController', [
            '$rootScope', '$scope', '$location', '$state', '$timeout',
            '$stateParams', '$translate', 'Restangular', 'toastr',
            ChangePasswordController
        ]);

    /* @ngInject */
    function ChangePasswordController(
        $rootScope, $scope, $location, $state, $timeout, $stateParams, $translate, Restangular, toastr
    ) {
        var vm = this;
        vm.timer = false;
        vm.message = {
            animation: 'bounceInDown',
            icon: 'fa-key',
            iconColor: 'orange',
            iconAnimation: '',
            title: 'Security',
            content: 'Please insert your new password.\nIf you refresh this page, certiication code will not saved',
            inputs: [{
                label: 'Password',
                type: 'password',
                model: ''
            },{
                label: 'repeat',
                type: 'password',
                model: ''
            }],
            buttons: [
                {
                    kind: 'submit-bt',
                    type: 'submit',
                    func: null,
                    content: 'CHANGE'
                }
            ],
            timer: false
        };
        vm.certCode = null; // Password

        vm.success = $stateParams.success;
        vm.kind = $stateParams.kind;
        vm.submit = submit;

        function submit() {
            vm.password = vm.message.inputs[0].model;
            vm.repeatPassword = vm.message.inputs[1].model;
            if(vm.password === vm.repeatPassword) {
                console.log("submit",vm.password,$stateParams.code);
                Restangular.all('/members/pwd/reset').customPUT(
                    { code: $stateParams.code, newPassword: vm.password }
                ).then(function(res) {
                    console.log(res);
                });
            }
            else {
                toastr.error('비밀번호를 다시 한번 확인하세요');
            }
        }
    }
})();
