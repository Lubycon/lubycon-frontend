/*
    @title: FormValidate.service.js
    @desc: lubycon form validator
    @author: Evan moon
    @created_at: 2016-12-09
    @updated_at: 2016-12-09
*/



(function () {
    'use strict';

    angular
        .module('services')
        .factory('FormValidateService', ['$rootScope',FormValidateService]);

    function FormValidateService($rootScope) {

        var service = {
            getCondition: getCondition,
            getRegx: getRegx,
            test: test
        };

        var regxs = {
            email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            notSpecialWord: /[^\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]$/g,
            password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{0,255}$/g,
            ignoreRepeatWord: /^(?:(.)(?!\1\1))*$/g,
            script: /<script[^>]*>(.*?)<\/script>/gi,
            style: /<style[^>]*>(.*?)<\/style>/gi
        };

        return service;

        // PUBLIC METHOD

        /*
            @name: getCondition
            @desc: returning type condition
            @params: type(String)
            @return Object
        */
        function getCondition(type) {
            return eval(type + 'Condition')();
        }

        /*
            @name: getRegx
            @desc: returning regx that using this app
            @params: type(String)
            @return Regx
        */
        function getRegx(type) {
            return regxs[type];
        }

        /*
            @name: test
            @desc: testing string using regxs
            @params: string(String), type(String)
            @return Object
        */
        function test(string, type) {
            // 'password'
            // 'nickname'
            return eval(type + 'Test')(string);
        }





        // PRIVATE METHOD

        /*
            @name: emailCondition
            @desc: returning email condition
            @params: null
            @return Object
        */
        function emailCondition() {
            return {
                pattern: {
                    test: function(value) {
                        return regxs.email.test(value);
                    }
                }
            };
        }

        /*
            @name: passwordCondition
            @desc: returning password condition
            @params: null
            @return Object
        */
        function passwordCondition() {
            return {
                minlength: 8,
                maxlength: 255,
                pattern: {
                    test: function(value) {
                        return regxs.password.test(value) && regxs.ignoreRepeatWord.test(value);
                    }
                }
            };
        }

        /*
            @name: nicknameCondition
            @desc: returning nickname condition
            @params: null
            @return Object
        */
        function nicknameCondition() {
            return {
                minlength: 4,
                maxlength: 20,
                pattern: {
                    test: function(value) {
                        return regxs.notSpecialWord.test(value);
                    }
                }
            };
        }
    }
})();
