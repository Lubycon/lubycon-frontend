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
        var mobileMenuToggleOn = false;

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

        vm.mobileMenuToggle = function() {
            var menuDOM = angular.element('.mobile-menu-list'),
                overlay = angular.element('.main-header.mobile').find('.overlay');

            if(mobileMenuToggleOn) {
                menuDOM.stop().css('right',0);
                overlay.stop().fadeIn(500);
            }
            else {
                overlay.stop().fadeOut(500);
                menuDOM.stop().css('right','-300px');
            }
            mobileMenuToggleOn = !mobileMenuToggleOn;
        };

        vm.doSignOut = function(){
            Authentication.clearCredentials('reload');
        };
    }
})();
