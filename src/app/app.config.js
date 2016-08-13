(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .config(toastSetting)
        .config(locationProvider)
        .config(restangularProvider)
        .config(cookiesProvider)
        .run(run);

    /** @ngInject */
    function config($logProvider) {
    // GLOBAL SETTING...

        // LOG IS ON
        $logProvider.debugEnabled(true);
    }

    function toastSetting(toastrConfig) {
        //Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 2000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = false;
        toastrConfig.preventOpenDuplicates = true;
        toastrConfig.progressBar = true;
        toastrConfig.maxOpened = 10;
        toastrConfig.autoDismiss = false;
    }

    function cookiesProvider($cookiesProvider) {
        var expires = new Date();
        expires.setFullYear(expires.getFullYear()+1);
        $cookiesProvider.defaults.expires = expires;
        console.log($cookiesProvider.defaults);
    }

    function locationProvider($locationProvider, $httpProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        }).hashPrefix('!');

        //$httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        //delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }

    function restangularProvider(RestangularProvider, API_CONFIG) {
        var _info = (function () {
            var result = { lang: 'en', country: '' };
            result.lang = 'en';

            // READING LANGUAGE DATA FROM NAVIGATOR....
            if(navigator.language) {
                result.lang = navigator.language;
                result.lang = result.lang.match(/(ko|en)/gi)[0];

                // SERVICE LANGUAGE
                // 0. ko -> KOREAN
                // 1. en -> ENGLISH
            }

            //DEFAULT LANGUAGE IS ENGLISH....
            if(('ko en zh').indexOf(result.lang) == -1) result.lang = 'en';

            return result;
        }());

        var defaultHeaders = {
            "Content-Type": "application/json",
            'X-lubycon-version': '1.0.0',
            'X-lubycon-language': _info.lang
        };

        RestangularProvider.setDefaultHeaders(defaultHeaders);
        RestangularProvider.setBaseUrl(API_CONFIG.host);
        console.log("Server Location : " + API_CONFIG.host);
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var extractedData;
            if (operation === "getList") {
                extractedData = [];
                extractedData.status = data.status;
                extractedData.resut = data.result;
            } else {
                extractedData = data;
            }
            return extractedData;
        });
    }

    function run(
        $rootScope, $location, $state, $cookieStore, Restangular,
        commonLayout,
        $window, CONSOLE_LOG , $timeout
    ) {
        // CONSOLE LOG SWITCH
        if(CONSOLE_LOG === false) {
            var console = {};
            console.log = function() {};
            window.console = console;
        }
        // CONSOLE LOG SWITCH


    }

})();
