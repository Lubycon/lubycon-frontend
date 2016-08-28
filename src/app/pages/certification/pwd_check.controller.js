(function() {
    'use strict';

    angular
        .module('messages')
        .controller('PwdCheckController', PwdCheckController);

    /* @ngInject */
    function PwdCheckController(
        $rootScope, $scope, $location, $state, $timeout, $stateParams, $translate
    ) {
        var vm = this;
        vm.timer = false;
        vm.message = {
            animation: 'bounceInDown',
            icon: 'fa-key',
            iconColor: 'orange',
            iconAnimation: '',
            title: 'Security',
            content: 'Please insert your password again.',
            inputLabel: 'Password',
            inputType: 'password',
            buttons: [
                {
                    kind: 'submit-bt',
                    type: 'submit',
                    func: null,
                    content: 'NEXT'
                }
            ]
        };
        vm.certCode = null; // Password

        vm.success = $stateParams.success;
        vm.kind = $stateParams.kind;
        vm.submit = submit;

        function submit() {
            console.log("submit",vm.inputCode);
        }
    }
})();
