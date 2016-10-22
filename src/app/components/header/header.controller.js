(function() {
    'use strict';

    angular
        .module('components')
        .controller('HeaderController', headerController);

    /* @ngInject */
    function headerController(
        $rootScope, $scope, $location, $state, $stateParams,
        Restangular, $timeout, $window, Authentication
    ) {
        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;
        vm.isMain = $stateParams.url === '/main';

        vm.menuList = [{
            name: 'CONTENTS',
            subMenu: [{
                name: 'Explorer',
                icon: 'fa-search',
                link: 'common.figure.contents({ category: "3d"})'
            }]
        },{
            name: 'COMMUNITY',
            subMenu: [{
                name: 'Forum',
                icon: 'fa-comment',
                link: 'common.figure.community({ category: "forum" })'
            }]
        }];

        // FOR HEADER BACKGROUND...
        $scope.scrollDetect = false;
        $scope.isMain = vm.isMain;

        vm.doSignOut = function(){
            Authentication.clearCredentials('reload');
        };
    }
})();
