(function () {
    'use strict';

    angular
        .module('services')
        .factory('FormValidateService', ['$rootScope',FormValidateService]);

    function FormValidateService($rootScope) {

        var service = {
            nickname: nickname
        };

        return service;

        function nickname() {
            //화이트리스트가 아니라 블랙 리스트를 만들어야함
            return {
                minLength: 4,
                maxLength: 20,
                pattern: /[a-zA-Z0-9가-힣]/gi
            };
        }
    }
})();
