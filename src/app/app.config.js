(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .config(toastSetting)
        .config(locationProvider)
        .config(restangularProvider)
        .config(cookiesProvider)
        .config(translateConfig)
        .run(authenticationDetect)
        .run(run);

    /** @ngInject */
    function config($logProvider) {
        $logProvider.debugEnabled(true);
    }

    function authenticationDetect($rootScope, $state, $cookieStore, Restangular, $translate, Authentication) {

        var defaultHeaders = angular.extend({}, Restangular.defaultHeaders, {
            "Content-Type": "application/json",
            'X-lubycon-version': '1.0.0'
        });

        console.log('authentication init start');

        Restangular.setDefaultHeaders(defaultHeaders);

        var authdata = $cookieStore.get('authdata');
        console.log(authdata);

        if(authdata) {
            defaultHeaders['X-lubycon-Token'] = authdata;
            Restangular.setDefaultHeaders(defaultHeaders);

            Restangular.one('members/simple').customGET().then(function (res) {
                if(res.status.code === '0000') {
                    $rootScope.member = res.result;
                    $cookieStore.put('member', $rootScope.user);
                }
                else {
                    Authentication.clearCredentials('reload');
                }
            });
        }
        else {
            Restangular.setDefaultHeaders(defaultHeaders);
        }
    }

    function toastSetting(toastrConfig) {
        //Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 4000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = false;
        toastrConfig.preventOpenDuplicates = true;
        toastrConfig.progressBar = false;
        toastrConfig.maxOpened = 10;
        toastrConfig.autoDismiss = false;

        toastrConfig.showEasing = 'swing';
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
            if(('ko en').indexOf(result.lang) == -1) result.lang = 'en';

            return result;
        }());

        var defaultHeaders = {
            "Content-Type": "application/json",
            'X-lubycon-version': '1.0.0',
            'X-lubycon-language': _info.lang,
            'lubycon-dev': API_CONFIG.appkey // REAL IS FALSE
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

    function translateConfig($translateProvider, $translatePartialLoaderProvider, APP_LANGUAGES) {
        /**
         *  each module loads its own translation file - making it easier to create translations
         *  also translations are not loaded when they aren't needed
         *  each module will have a il8n folder that will contain its translations
         */

        // $translateProvider.useLoader('$translatePartialLoader', {
        //     urlTemplate: '{part}/il8n/{lang}.json'
        // });

        $translateProvider.useLoader('$translatePartialLoader', {
            //urlTemplate: 'app/language/{lang}.json'
            urlTemplate: 'app/language/en.json' // ENGLISH TESTING....
        });


        $translatePartialLoaderProvider.addPart('app');

        // make sure all values used in translate are sanitized for security
        $translateProvider.useSanitizeValueStrategy('escaped');

        // cache translation files to save load on server
        $translateProvider.useLoaderCache(true);

        // setup available languages in translate
        var languageKeys = [];
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            languageKeys.push(APP_LANGUAGES[lang].key);
        }

        /**
         *  try to detect the users language by checking the following
         *      navigator.language
         *      navigator.browserLanguage
         *      navigator.systemLanguage
         *      navigator.userLanguage
         */


        $translateProvider.registerAvailableLanguageKeys(languageKeys, {
            'ko_KR': 'ko',
            'en_US': 'en', 'en_UK': 'en'
        })
        .determinePreferredLanguage();

        $translateProvider.useLocalStorage();
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
            console.error = function() {};
            console.warn = function() {};
            console.info = function() {};
            console.time = function() {};
            console.timeEnd = function() {};

            window.console = console;
        }
        // CONSOLE LOG SWITCH


    }

})();
