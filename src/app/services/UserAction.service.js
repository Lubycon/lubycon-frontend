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

        // API PARAMS /////////////////////////////////////////////
        // bookmark : /bookmark/{boardType}/{category}/{boardId} //
        // like : /like/{boardType}/{category}/{boardId}         //
        // comment : /comments/{category}/{boardId}              //
        ///////////////////////////////////////////////////////////

        // PUBLIC METHOD
        function post(params) {
            console.log(params);
        }

        function put(params) {
            console.log(params);
        }

        function remove(params) {
            console.log(params);
        }

        //PRIVATE METHOD

    }
})();
