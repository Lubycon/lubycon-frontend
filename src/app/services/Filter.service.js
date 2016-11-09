(function () {
    'use strict';

    angular
        .module('app')
        .factory('FilterService', [
            '$rootScope', '$location', '$window',
            FilterService
        ]);

    function FilterService($rootScope, $location, $window) {

        var service = {
            getParams: getParams,
            search: search
        };

        return service;

        function getParams() {
            var params = $location.search()  || null;
            var keys;

            if(params) {
                keys = Object.keys(params);
                keys.map(function(v) {
                    params[v] = /^[0-9]*$/gi.test(params[v]) ? parseInt(params[v]) : params[v];
                });
            }
            return params;
        }

        function search(params) {
            var path = $location.path();
            if(params) {
                console.log(path);

                $location.search(params);
                $window.location.reload();
            }
            else {
                console.error('FilterService search param exception : There are no params! Please make sure your parameters');
                return false;
            }
        }

        function getQueryString(param) {

            return param;
        }
    }
})();
