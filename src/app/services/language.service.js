(function () {
    'use strict';

    angular
        .module('app')
        .factory('LanguageService', [
            '$rootScope', '$http',
            LanguageService
        ]);

    function LanguageService($rootScope, $http) {

        var service = {
            set: _set,
            get: _get
        };

        return service;

        function _set(newLang,member) {
            console.log(newLang,$rootScope);
            $http.get('/data/languages.json').then(function(res) {
                var languageSet = res.data;
                var languageModel = {};

                var isSupported = false;

                languageModel.language = newLang;
                languageModel.target = member === 'member' ? member : 'device';
            });





            // 우선순위
            // 0. device language
            // 1. user가 로그인했을 시 user의 language
            // 2. 이 언어가 루비콘에서 지원하는 언어인가?
            // -> true: 변경, false -> 영어로 세팅
            // 예외처리 조건이 너무 많기 때문에 account setting에서 첫번째 메인 언어는 루비콘에서 지원하는 언어 7개 중 하나 셀렉박스로 선택하라고 하고
            // 나머지는 텍스트 박스(현재 방식)으로 옵션으로 준다
        }

        function _get() {

        }
    }
})();
