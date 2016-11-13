(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserActionService', [
            '$rootScope', '$location', '$window',
            UserActionService
        ]);

    function UserActionService($rootScope, $location, $window) {

        var service = {
            post: post,
            put: put,
            delete: remove
        };

        return service;

        // PUBLIC METHOD
        function post() {

        }

        function put() {

        }

        function remove() {

        }

        //PRIVATE METHOD

    }
})();
