(function () {
    'use strict';

    angular
        .module('services')
        .factory('UUIDService', ['$rootScope', UUIDService]);

    function UUIDService($rootScope) {

        var service = {
            generate: generate
        };

        return service;

        function generate(type) {
            var date = new Date().getMilliseconds();
            if(window.performance && typeof window.performance.now === "function"){
                date += performance.now();
            }
            var uuid = type.replace(/[xy]/g, function(char) {
                var rand = (date + Math.random() * 16) % 16 | 0;
                date = Math.floor(date / 16);
                return (char === 'x' ? rand : (rand & 0x3 | 0x8)).toString(16);
            });

            return uuid;
        }
    }
})();
