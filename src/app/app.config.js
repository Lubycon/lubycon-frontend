(function() {
    'use strict';

    angular
        .module('app')
        .config([
            '$httpProvider', httpConfig
        ])
        .config([
            'toastrConfig', toastSetting
        ])
        .config([
            '$locationProvider', locationProvider
        ])
        .config([
            'RestangularProvider', 'API_CONFIG', 'USER_AGENT', restangularProvider
        ])
        .config([
            '$cookiesProvider', cookiesProvider
        ])
        .config([
            '$translateProvider', '$translatePartialLoaderProvider', 'APP_LANGUAGES',
            translateConfig
        ])
        .run([
            '$rootScope', '$state', 'CookieService',
            'Restangular', '$translate', 'Authentication',
            authenticationDetect
        ])
        .run([
            '$rootScope', '$location', '$state',
            'CookieService', 'Restangular', 'commonLayout',
            '$window', 'CONSOLE_LOG', '$timeout',
            run
        ]);






    /** @ngInject */
    function httpConfig($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        $httpProvider.interceptors.push('httpInterceptor');
    }

    function authenticationDetect($rootScope, $state, CookieService, Restangular, $translate, Authentication) {

        var defaultHeaders = angular.extend({}, Restangular.defaultHeaders, {
            "Content-Type": "application/json",
            'X-lubycon-version': '1.0.0'
        });

        console.log('authentication init start');

        Restangular.setDefaultHeaders(defaultHeaders);

        var oauthData = CookieService.getDecrypt('oauth');
        var memberState = CookieService.getDecrypt('memberState');
        console.log(oauthData,memberState);

        if(oauthData && memberState && memberState.sign) {
            defaultHeaders['X-lubycon-Token'] = oauthData;
            Restangular.setDefaultHeaders(defaultHeaders);
            $rootScope.memberState = memberState;

            console.log(Restangular.defaultHeaders);

            Restangular.one('members/simple').customGET().then(function (res) {
                if(res.status.code === '0000') {
                    $rootScope.member = res.result;
                    CookieService.put('member', $rootScope.user);
                }
                else {
                    Authentication.clearCredentials('reload');
                }
            });
        }
        else {
            Restangular.setDefaultHeaders(defaultHeaders);
            $rootScope.memberState = {
                sign: false
            };
            CookieService.putEncrypt('memberState',$rootScope.memberState);
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
        expires.setFullYear(expires.getFullYear() + 1);
        $cookiesProvider.defaults.expires = expires;
    }

    function locationProvider($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        }).hashPrefix('!');
    }

    function restangularProvider(RestangularProvider, API_CONFIG, USER_AGENT) {
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
            if(('ko en').indexOf(result.lang) === -1) result.lang = 'en';

            return result;
        }());

        var defaultHeaders = {
            'Content-Type': 'application/json',
            'X-lubycon-version': '1.0.0',
            'X-lubycon-language': _info.lang,
            'X-lubycon-device': 'bs=' + USER_AGENT.browser + ',dvc=' + USER_AGENT.device + ',os=' + USER_AGENT.os,
            'lubycon-dev': API_CONFIG.appkey // REAL IS FALSE
        };

        RestangularProvider.setDefaultHeaders(defaultHeaders);
        RestangularProvider.setBaseUrl(API_CONFIG.host);

        console.log('Server Location : ' + API_CONFIG.host);
        console.log('Restangular DEFAULT HEADER : ', RestangularProvider.defaultHeaders);
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
            urlTemplate: 'app/language/ko.json' // ENGLISH TESTING....
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
        $rootScope, $location, $state, CookieService, Restangular,
        commonLayout,
        $window, CONSOLE_LOG , $timeout
    ) {
        // CONSOLE LOG SWITCH
        if(CONSOLE_LOG === false) {
            var console = {};
            console.log = function() {};
            console.warn = function() {};
            console.info = function() {};
            console.time = function() {};
            console.timeEnd = function() {};

            window.console = console;
        }
        // CONSOLE LOG SWITCH
    }

})();
