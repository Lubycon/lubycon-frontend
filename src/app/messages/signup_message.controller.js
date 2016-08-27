(function() {
    'use strict';

    angular
        .module('messages')
        .controller('SignupMessageController', SignupMessageController);

    /* @ngInject */
    function SignupMessageController(
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

        if(vm.success){
            vm.message.icon = 'fa-thumbs-o-up';
            vm.message.iconColor = 'mint';
            vm.message.title = 'Welcome to LUBYCON!';
            vm.message.content = 'Your account is activated';
            vm.message.buttons = [
                {
                    func: goToMain,
                    content: 'Enjoy LUBYCON'
                }
            ];
        }
        else {
            vm.message.icon = 'fa-frown-o';
            vm.message.iconColor = 'red';
            vm.message.title = 'Sorry. Creating Account is failed';
            vm.message.content = 'Your account is inactivated';
            vm.message.buttons = [
                {
                    func: goToBack,
                    content: 'Back'
                }
            ];
        }

        function goToMain(){
            $state.go('common.figure.main');
        }
        function goToBack(){
            var fromLocation = $rootScope.clientLocation.from;
            $state.go(fromLocation.url,fromLocation.params);
        }
    }
})();
