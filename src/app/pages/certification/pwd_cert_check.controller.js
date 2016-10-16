(function() {
    'use strict';

    angular
        .module('messages')
        .controller('PwdCertCheckController', [
            '$rootScope', '$scope', '$location', '$state', '$timeout',
            '$stateParams', '$translate', 'Restangular',
            PwdCertCheckController
        ]);

    /* @ngInject */
    function PwdCertCheckController(
        $rootScope, $scope, $location, $state, $timeout, $stateParams, $translate, Restangular
    ) {
        var vm = this;
        vm.timer = false;
        vm.message = {
            animation: 'bounceInDown',
            icon: 'fa-key',
            iconColor: 'orange',
            iconAnimation: '',
            title: 'Security',
            content: 'Please insert your new password.',
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
            console.log("submit",vm.inputCode);
        }
    }
})();
