(function () {
    'use strict';

    angular
        .module('app')
        .factory('infiniteScrollService', [
            '$cookieStore', '$cookies', '$rootScope', 'Restangular',
            '$window', '$location',
            infiniteScrollService
        ]);

    function infiniteScrollService(
        $cookieStore, $cookies, $rootScope, Restangular,
        $window, $location, toastr
    ) {
        var service = {
            get: getResources
        };

        function getResources(uri,pageIndex) {
            pageIndex++;
            return Restangular.all(uri).customGET('',{
                pageIndex: pageIndex
            });
        }

        return service;
    }
})();
