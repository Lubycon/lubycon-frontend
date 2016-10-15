(function() {
    'use strict';

    angular
        .module('messages')
        .controller('pwdMessageController', [
            '$rootScope', '$scope', '$location', '$state',
            '$timeout', '$stateParams', '$translate',
            pwdMessageController
        ]);

    /* @ngInject */
    function pwdMessageController(
        $rootScope, $scope, $location, $state, $timeout, $stateParams, $translate
    ) {
        var vm = this;

        vm.message = {
            animation: 'bounceInDown',
            icon: null,
            iconColor: null,
            iconAnimation: '',
            title: null,
            content: null
        };

        vm.success = $stateParams.success;

        if(!vm.success){
            vm.message.icon = 'fa-key';
            vm.message.iconColor = 'orange';
            vm.message.title = 'SUCCESS';
            vm.message.content = 'Your password is successful changed';
            vm.message.buttons = [
                {
                    func: goToMain,
                    content: 'CONTINUE'
                }
            ];
        }
        else {
            vm.message.icon = 'fa-frown-o';
            vm.message.iconColor = 'red';
            vm.message.title = 'Failed';
            vm.message.content = 'failed';
            vm.message.buttons = [
                {
                    func: goToMain,
                    content: 'Home'
                }
            ];
        }

        function goToMain(){
            $state.go('common.figure.main');
        }
    }
})();
