(function () {
    'use strict';
    angular
        .module('services')
        .factory('AppSettingService', [
            '$rootScope', '$http', 'Restangular', 'CookieService',
            AppSettingService
        ]);

    function AppSettingService($rootScope, $http, Restangular, CookieService) {
        var service = {
            init: init,
            get: get,
            set: set
        };

        return service;

        // PUBLIC METHOD

        function init() {
            var data = CookieService.get('setting');
            if(data) {
                $rootScope.setting = data;
                setInitSetting();
            }
            else {
                $http({
                    method: 'jsonp',
                    url: 'https://freegeoip.net/json?callback=JSON_CALLBACK',
                    responseType: "json"
                }).then(function(res) {
                    $rootScope.setting = res.data;
                    CookieService.put('setting', res.data);

                    setInitSetting();
                });
            }
        }

        function get(key) {
            if(param) return $rootScope.setting[param];
            else return $rootScope.setting;
        }

        function set(key, value) {
            var defaultHeaders = Restangular.defaultHeaders;

            var headerParam = ['country', 'language'],
                headerKey,
                _temp = {};

            if(headerParam.indexOf(key) > -1) {
                headerKey = 'X-lubycon-' + key;
                _temp[headerKey] = value;
                if(key === 'country') _temp['X-lubycon-language'] = setLanguage(value);

                defaultHeaders = angular.extend({}, Restangular.defaultHeaders, _temp);
            }

            Restangular.setDefaultHeaders(defaultHeaders);
        }

        // PRIVATE METHOD

        function setInitSetting() {
            switch($rootScope.setting.country_code) {
                case 'KR' : $rootScope.setting.language = 'ko'; break;
                default : $rootScope.setting.language = 'en'; break;
            }

            var defaultHeaders = angular.extend({}, Restangular.defaultHeaders, {
                'X-lubycon-country': $rootScope.setting.country_code
            });

            Restangular.setDefaultHeaders(defaultHeaders);
            console.log(Restangular.defaultHeaders);
        }

        function setLanguage(country) {
            switch(country) {
                case 'KR': return 'ko';
                default: return 'en';
            }
        }
    }
})();
