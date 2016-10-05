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
        vm.mainText = "Connect Your Creativity With The World";
    }
})();
