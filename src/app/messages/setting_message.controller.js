(function() {
    'use strict';

    angular
        .module('messages')
        .controller('SettingMessageController', [
            '$rootScope', '$scope', '$location', '$state',
            '$timeout', '$stateParams', '$translate',
            SettingMessageController
        ]);

    /* @ngInject */
    function SettingMessageController(
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
            vm.message.icon = 'fa-thumbs-o-up';
            vm.message.iconColor = 'mint';
            vm.message.title = 'SUCCESS';
            vm.message.content = 'Your setting is successful uploaded. Thank you!';
            vm.message.buttons = [
                {
                    func: goToMyDashboard,
                    content: 'CHECK MY DASHBOARD'
                },
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

        function goToMyDashboard(){
            // memberId -> 추후 $rootScope에서 빼올 것
            $state.go('aside.default.dashboard',{ memberId: 0 });
        }
        function goToMain(){
            $state.go('common.figure.main');
        }
    }
})();
