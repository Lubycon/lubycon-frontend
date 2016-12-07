(function () {
    'use strict';

    angular
        .module('app')
        .factory('HistoryService', ['$rootScope',HistoryService]);

    function HistoryService($rootScope) {

        var service = {
            push: push,
            getAll: getAll,
            get: get,
            getPrev: getPrev
        };

        return service;

        function push(history) {
            if(!$rootScope.stateHistory) $rootScope.stateHistory = [];
            $rootScope.stateHistory.push(history);
            if($rootScope.stateHistory.length > 50) $rootScope.stateHistory.shift();
        }

        function getAll() {
            return $rootScope.stateHistory;
        }

        function get(index) { // IF INDEX IS undefined, THIS METHOD WILL BE RETURN CURRENT STATE
            if(index) return $rootScope.stateHistory[index];
            else return $rootScope.stateHistory[$rootScope.stateHistory.length - 1];
        }

        function getPrev(index) { // RETURN THE STATE BEFORE 1 STEP
            if(index) return $rootScope.stateHistory[$rootScope.stateHistory.length - (index + 2)];
            else return $rootScope.stateHistory[$rootScope.stateHistory.length - 2];
        }
    }
})();
