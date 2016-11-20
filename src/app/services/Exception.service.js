(function () {
    'use strict';

    angular
        .module('services')
        .factory('ExceptionService', [
            '$rootScope', '$location', '$window', 'Restangular',
            ExceptionService
        ]);

    function ExceptionService(
        $rootScope, $location, $window, Restangular
    ) {

        var service = {
            log: log
        };

        return service;


        // PUBLIC
        function log(error, cause) {
            console.log('=================[ ERROR EXCEPTION ]===============');
            console.log('ERROR : ', error);
            console.log('REASON : ', cause);
            console.log('===================================================');
        }


        // PRIVATE
        function postToServer(error, cause) {
            Restangular.all('').customPOST().then(function(res) {
                console.log(res);
            });
        }
    }
})();
