(function() {
    'use strict';

    angular
        .module('app.pages.certification')
        .controller('PwdCheckController', [
            '$rootScope', '$scope', '$location', '$state', '$timeout',
            '$stateParams', '$translate', 'Restangular',
            PwdCheckController
        ]);

    /* @ngInject */
    function PwdCheckController(
        $rootScope, $scope, $location, $state, $timeout, $stateParams,
        $translate, Restangular
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
            inputs: [{
                label: 'Password',
                type: 'password',
                model: vm.password
            }],
            buttons: [
                {
                    kind: 'submit-bt',
                    type: 'submit',
                    func: null,
                    content: 'NEXT'
                }
            ]
        };

        vm.success = $stateParams.success;
        vm.kind = $stateParams.kind;
        vm.submit = submit;

        function submit() {
            Restangular.all('certs/pwd').customPOST({
                password: vm.password
            }).then(function(res) {
                console.log(res);
            });
        }
    }
})();
