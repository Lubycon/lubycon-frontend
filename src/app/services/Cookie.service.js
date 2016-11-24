(function () {
    'use strict';

    angular
        .module('services')
        .factory('CookieService', ['$rootScope', '$cookies', 'Base64Service', CookieService]);

    function CookieService($rootScope, $cookies, Base64Service) {
        var service = {
            get: get,
            getString: getString,
            getDecrypt: getDecrypt,
            getAll: getAll,
            put: put,
            putString: putString,
            putEncrypt: putEncrypt,
            remove: remove
        };

        return service;

        // PUBLIC
        function get(key) {
            key = encode(key);
            return $cookies.getObject(key);
        }

        function getString(key) {
            key = encode(key);
            return $cookies.get(key);
        }

        function getDecrypt(key) {
            console.log('COOKIE GET DECRYPT KEY => ',key);
            key = encode(key);
            var value = decodeValue($cookies.get(key));
            console.log('COOKIE GET DECRYPT VALUE => ',value);

            return value;
        }

        function getAll() {
            key = encode(key);
            return $cookies.getAll();
        }

        function put(key, value, options) {
            console.log('COOKIE PUT => ',key,value,options);
            key = encode(key);
            console.log('COOKIE PUT ECRYPTED KEY => ',key);
            return $cookies.putObject(key, value, options);
        }

        function putString(key, value, options) {
            key = encode(key);
            return $cookies.put(key, value, options);
        }

        function putEncrypt(key, value, options) {
            key = encode(key);
            value = encodeValue(value);
            return $cookies.put(key, value, options);
        }

        function remove(key, options) {
            key = encode(key);
            return $cookies.remove(key, options);
        }




        // PRIVATE

        /*STRING*/
        function encode(key) {
            if(!key) return null;

            return Base64Service.encode('lubycon-' + key)
                .split('').reverse().join('');
        }

        /*STRING | OBJECT*/
        function encodeValue(value) {
            if(!value) return null;

            var type = value.constructor.name;
            value = JSON.stringify(value);

            return Base64Service.encode(value);
        }

        /*STRING*/
        function decode(key) {
            if(!key) return null;

            return Base64Service.decode(key)
                .split('').reverse().join('');
        }

        /*STRING | OBJECT*/
        function decodeValue(value) {
            console.log(value);
            if(!value) return null;

            value = Base64Service.decode(value);
            value = JSON.parse(value);

            return value;
        }

    }
})();
