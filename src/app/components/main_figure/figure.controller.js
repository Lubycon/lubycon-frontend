(function() {
    'use strict';

    angular
        .module('components')
        .controller('FigureController', [
            '$rootScope', '$scope', '$location', '$state', 'Restangular', '$timeout',
            FigureController
        ]);

    /* @ngInject */
    function FigureController(
        $rootScope, $scope, $location, $state, Restangular, $timeout
    ) {
        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;
        vm.mainText = "Connect Your Creativity With The World";
    }
})();
