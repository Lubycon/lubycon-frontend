(function() {
    'use strict';

    angular
        .module('components')
        .controller('HeaderController', headerController);

    /* @ngInject */
    function headerController(
        $rootScope, $scope, $location, $state, Restangular, $timeout,
        DeviceConfig, $window
    ) {
        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;
        console.log(vm.isMobile);

        vm.menuList = {
            content: {
                name: "CONTENTS",
                link: "/contents/3d"
            },
            community: [
                {
                    name: "Creator",
                    icon: "fa fa-pencil",
                    link: "/creator"
                },
                {
                    name: "Forum",
                    icon: "fa fa-comments",
                    link: "/community/forum"
                },
                {
                    name: "Tutorial",
                    icon: "fa fa-book",
                    link: "/community/tutorial"
                },
                {
                    name: "Q&A",
                    icon: "fa fa-question",
                    link: "/community/qna"
                }
            ]
        };

        vm.signinLink = "";

        // FOR HEADER BACKGROUND...
        $scope.scrollDetect = false;
    }
})();
