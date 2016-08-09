(function() {
    'use strict';

    angular
        .module('components')
        .controller('FooterController', footerController);

    /* @ngInject */
    function footerController(
        $rootScope, $scope, $location, $state, Restangular, $timeout
    ) {
        var vm = this;

    }
})();
