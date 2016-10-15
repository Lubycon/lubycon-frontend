(function () {
    'use strict';

    angular
        .module('app')
        .factory('ArrayService', ['$rootScope',ArrayService]);

    function ArrayService($rootScope) {

        var service = {
            makeUniq: makeUniq,

        };

        return service;

        function makeUniq(array) {
            return array.reduce(function(a,b){
                if(a.indexOf(b) < 0) a.push(b);
                return a;
            },[]);
        }

        function clean(array) {
            return array.filter(function(v){
                return v;
            });
        }
    }
})();
