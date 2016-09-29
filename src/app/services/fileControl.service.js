(function () {
    'use strict';

    angular
        .module('app')
        .factory('FileControlService', FileControlService);

    function FileControlService($rootScope) {

        var service = {
            getExtention: getExtention,

        };

        return service;

        function getExtention(file) {
            var name = file.name,
            indexNum = name.lastIndexOf("."),
            extention = indexNum > -1 ? name.substring(indexNum + 1) : "";
            console.log(extention);
            return extention.toLowerCase();
        }
    }
})();
