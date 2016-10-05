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
                link: 'common.figure.contents({ category: "3d" })'
            },
            community: [
                {
                    name: 'Creator',
                    icon: 'fa fa-pencil',
                    link: 'common.figure.creator({ category: null })'
                },
                {
                    name: 'Forum',
                    icon: 'fa fa-comments',
                    link: 'common.figure.community({ category: "forum" })'
                },
                {
                    name: 'Tutorial',
                    icon: 'fa fa-book',
                    link: 'common.figure.community({ category: "tutorial" })'
                },
                {
                    name: 'Q&A',
                    icon: 'fa fa-question',
                    link: 'common.figure.community({ category: "qna" })'
                }
            ]
        };

        // FOR HEADER BACKGROUND...
        $scope.scrollDetect = false;
        $scope.isMain = vm.isMain;
    }
})();
