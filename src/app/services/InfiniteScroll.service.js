// INFINTE SCROLL SERVICE
// TODO 연속해서 요청이 날라가지 않도록 타이머를 걸까 생각 중
// 2016.11.12 -evan

(function () {
    'use strict';

    angular
        .module('app')
        .factory('InfiniteScrollService', [
            '$cookieStore', '$cookies', '$rootScope', 'Restangular',
            '$window', '$location', InfiniteScrollService
        ]);

    function InfiniteScrollService(
        $cookieStore, $cookies, $rootScope, Restangular,
        $window, $location
    ) {
        var pageIndex;
        var filterData;
        var callCount;

        var service = {
            init: init,
            get: getResources
        };

        return service;

        // PUBLIC
        function init(params) {
            pageIndex = 1;
            callCount = 0;
            filterData = angular.copy(params) || {};
        }

        function getResources(uri) { // return -> promise
            console.log(filterData,pageIndex);

            if(callCount > 0) pageIndex++;
            callCount++;

            filterData.pageIndex = pageIndex;

            return Restangular.all(uri).customGET('', filterData);
        }

        //PRIVATE
    }
})();
