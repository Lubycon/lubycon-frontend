(function() {
    'use strict';

    angular
        .module('messages')
        .controller('ContentsMessageController', [
            '$rootScope', '$scope', '$location', '$state',
            '$timeout', '$stateParams', '$translate',
            ContentsMessageController
        ]);

    /* @ngInject */
    function ContentsMessageController(
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
        vm.kind = $stateParams.kind;
        vm.mypageURI = vm.kind === 'content' ? '' : ''; // ? MY CONTENT : MY FORUM

        if(vm.success){
            vm.message.icon = 'fa-thumbs-o-up';
            vm.message.iconColor = 'mint';
            vm.message.title = 'SUCCESS';
            vm.message.content = 'Your content is successful uploaded. Thank you!';
            vm.message.buttons = [{
                func: goToMyContents,
                content: 'CHECK MY CONTENT'
            },{
                func: goToMain,
                content: 'CONTINUE'
            }];
        }
        else {
            vm.message.icon = 'fa-frown-o';
            vm.message.iconColor = 'red';
            vm.message.title = 'Failed';
            vm.message.content = 'failed';
            vm.message.buttons = [{
                func: goToMain,
                content: 'Home'
            }];
        }

        function goToMyContents(){
            if(vm.kind === 'contents') {
                $state.go('common.default.contents-view',{ category: '3d', boardId: $stateParams.id });
            }
            else if(vm.kind === 'posts') {
                $state.go('common.default.community-view',{ category: 'forum', postId: $stateParams.id });
            }
        }
        function goToMain(){
            $state.go('common.figure.main');
        }
    }
})();
