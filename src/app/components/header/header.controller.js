(function() {
    'use strict';

    angular
        .module('components')
        .controller('HeaderController', headerController);

    /* @ngInject */
    function headerController(
        $rootScope, $scope, $location, $state, Restangular, $timeout
    ) {
        var vm = this;

    }
})();
