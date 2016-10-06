(function() {
    'use strict';

    angular
        .module('messages')
        .controller('CertCheckController', CertCheckController);

    /* @ngInject */
    function CertCheckController(
        $rootScope, $scope, $location, $state, $timeout, $stateParams, $translate
    ) {
        var vm = this;
        vm.timer = $stateParams.kind === 'signup';
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


        vm.testTime = 11506356840; // miliseconds

        function submit() {
            console.log("submit",vm.inputCode);
        }
    }
})();
