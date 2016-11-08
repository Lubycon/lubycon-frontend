(function () {
    'use strict';

    angular
        .module('app')
        .factory('FilterService', [
            '$rootScope', '$location',
            FilterService
        ]);

    function FilterService($rootScope, $location) {

        var service = {
            getParams: getParams,
            search: search
        };

        return service;

        function getParams() {
            return $location.search() || null;
        }

        function search(params) {
            if(params) {
                $location.path().search(params);
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
