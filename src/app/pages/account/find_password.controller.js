(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('FindPasswordController', [
            '$rootScope', '$scope', '$location', '$state', '$timeout',
            '$stateParams', '$translate', 'Restangular',
            FindPasswordController
        ]);

    /* @ngInject */
    function FindPasswordController(
        $rootScope, $scope, $location, $state, $timeout, $stateParams, $translate, Restangular
    ) {
        var vm = this;
        vm.model = null; // E-mail
        vm.message = {
            animation: 'bounceInDown',
            icon: 'fa-key',
            iconColor: 'orange',
            iconAnimation: '',
            title: 'Find Password',
            content: 'Please write your email',
            inputs: [{
                label: 'E-mail',
                type: 'email',
                model: '',
                placeholder: 'ex) example@lubycon.com'
            }],
            buttons: [{
                kind: 'submit-bt',
                type: 'submit',
                func: null,
                content: 'NEXT'
            }],
            timer: false
        };

        vm.submit = submit;

        function submit() {
            vm.email = vm.message.inputs[0].model;

            Restangular.all('members/pwd/mail').customPOST(
                {email: vm.email},
                undefined,
                undefined,
                {'Content-Type': 'application/json'})
            .then(function(res) {
                res = {
                    status : {
                        code: '0000'
                    }
                };
                if(res.status.code === '0000') {
                    $state.go('common.noFooter.cert',{type:'password'});
                }
                else console.log(res.status.code);
            });
        }
    }
})();
