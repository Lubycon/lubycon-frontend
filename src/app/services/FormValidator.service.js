(function () {
    'use strict';

    angular
        .module('services')
        .factory('FormValidateService', ['$rootScope',FormValidateService]);

    function FormValidateService($rootScope) {

        var service = {
            getRegx: getRegx,
            check: check
        };

        return service;

        // PUBLIC METHOD
        function getRegx(name) {
            return eval(name);
        }

        function check(value, name) {
            var regx = getRegx(name);
            return regx.test(value);
        }

        // PRIVATE REGX
        function nickname() {
            // 4~20자 -,_를 제외한 특수문자 불가
            return /[^\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]{4,20}$/gi;
        }

        function password() {
            // 6~255자 영문 대소문자 && 최소 1개의 숫자 혹은 특수 문자를 포함해야한다.
            return /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,255}$/gi;
        }

        function ignoreSpecialWord() {
            return /[\{\}\[\]\/?.,;:|\)*~`!-_^\+<>@\#$%&\\\=\(\'\"]/gi;
        }
    }
})();
