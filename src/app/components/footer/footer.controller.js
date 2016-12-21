(function() {
    'use strict';

    angular
        .module('components')
        .controller('FooterController', [
            '$rootScope', '$scope', '$location', '$state', '$http',
            'Restangular', '$timeout',
            footerController
        ]);

    /* @ngInject */
    function footerController(
        $rootScope, $scope, $location, $state, $http,
        Restangular, $timeout
    ) {
        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;
    }
})();
