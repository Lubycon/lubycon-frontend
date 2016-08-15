(function() {
    'use strict';

    angular
        .module('components')
        .controller('FigureController', FigureController);

    /* @ngInject */
    function FigureController(
        $rootScope, $scope, $location, $state, Restangular, $timeout,
        DeviceConfig
    ) {
        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;


        vm.isMain = $state.current.url === "/main";
        vm.mainText = "Connect Your Creativity With The World";

        console.log(vm.isMain);
    }
})();
