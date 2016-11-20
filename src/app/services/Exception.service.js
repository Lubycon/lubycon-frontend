(function () {
    'use strict';

    angular
        .module('services')
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
