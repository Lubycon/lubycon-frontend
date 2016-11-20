(function () {
    'use strict';

    angular
        .module('services')
        .factory('UserActionService', [
            '$rootScope', '$location', '$window', 'Restangular',
            UserActionService
        ]);

    function UserActionService(
        $rootScope, $location, $window, Restangular
    ) {

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
        function post(uriParams,contentParams) {
            var uri = URIGenerator(uriParams);
            return Restangular.all(uri).customPOST(contentParams);
        }

        function put(uriParams,contentParams) {
            var uri = URIGenerator(uriParams);
            return Restangular.all(uri).customPUT(contentParams);
        }

        function remove(uriParams) {
            var uri = URIGenerator(uriParams);
            console.log(uri);
            return Restangular.all(uri).customDELETE();
        }

        //PRIVATE METHOD
        function URIGenerator(params) {
            var result = '';

            params.map(function(v) {
                result += (v+'/');
            });
            return result.slice(0,-1);
        }
    }
})();
