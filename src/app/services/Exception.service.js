(function () {
    'use strict';

    angular
        .module('app')
        .factory('ExceptionService', [
            '$rootScope', '$location', '$window', 'Restangular',
            '$excpetionHandler', '$log',
            ExceptionService
        ]);

    function ExceptionService(
        $rootScope, $location, $window, Restangular,
        $excpetionHandler, $log
    ) {

        var service = {

        };

        return service;
    }
})();
