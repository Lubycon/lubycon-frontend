(function() {
    'use strict';

    angular
        .module('components')
        .controller('HeaderController', headerController);

    /* @ngInject */
    function headerController(
        $rootScope, $scope, $location, $state, $stateParams, Restangular, $timeout, $window
    ) {
        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;
        vm.isMain = $stateParams.url === '/main';

        vm.menuList = {
            content: {
                name: 'CONTENTS',
                link: '/contents/3d'
            },
            community: [
                {
                    name: 'Creator',
                    icon: 'fa fa-pencil',
                    link: '/creator'
                },
                {
                    name: 'Forum',
                    icon: 'fa fa-comments',
                    link: '/community/forum'
                },
                {
                    name: 'Tutorial',
                    icon: 'fa fa-book',
                    link: '/community/tutorial'
                },
                {
                    name: 'Q&A',
                    icon: 'fa fa-question',
                    link: '/community/qna'
                }
            ]
        };

        // FOR HEADER BACKGROUND...
        $scope.scrollDetect = false;
        $scope.isMain = vm.isMain;
    }
})();
