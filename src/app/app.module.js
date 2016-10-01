(function() {
  'use strict';

  angular
    .module('app', [
        'common', // COMMON MODULE
        'components', // COMPONENTS MODULE
        'app.pages', // PAGES MODULE
        'error', // ERROR PAGE MODULE
        'messages', // MESSAGE PAGE MODULE
        'services', // SERVICE MODULE
        'pascalprecht.translate', // TRANSLATE FOR LANGUAGE PACK MODULE
        'ngAnimate', // animate.css MODULE
        'ngCookies', // COOKIE STORE MODULE
        'ngTouch', // TOUCH MODULE FOR MOBILE
        'ngSanitize', // STRING TO HTML CONVERT MODULE
        'ngMessages', // INFO OR ERROR MESSAGE MODULE
        'ngAria', // FORM CONTROL MODULE
        'localytics.directives', // ANGULAR CHOSEN MODULE(MULTIPLE SELECTOR)
        'restangular', // REST API MODULE
        'ui.router', // ROUTING MODULE
        'ui.bootstrap', // BOOTSTRAP
        'ngFileUpload', // FILE UPLOAD MODULE
        'rzModule', // SLIDER COMPONENT MODULE
        'angularSpectrumColorpicker', // COLOR PICKER MODULE
        'switcher', // CHECKBOX SWITCH MODE MODULE
        'toastr' , // TOAST MESSAGE MODULE
        'monospaced.elastic' // TEXTAREA AUTOMATICALLY SIZE
    ])
    .constant('APP_LANGUAGES', [
        {
            name: 'LANGUAGES.ENGLISH',
            key: 'en'
        },
        {
            name: 'LANGUAGES.KOREAN',
            key: 'ko'
        }
    ])
    .constant('CONSOLE_LOG', true) // REAL SERVER -> false
    .constant('API_CONFIG', {
    // THIS IS SERVER LOCATION SWITCH
    // port = { APACHE: 8888, mySql: 8889 }
        //'host': 'http://localhost:8888/var/www/LubyconAPI/public/', // MY LOCAL
        'host': 'http://52.42.84.192/',
        //'host': 'http://aws.lubycon.com/var/www/LubyconAPI/app/http/routes.php',
        'content': 'http://localhost:8888/contents/', // MY LOCAL
        'appkey': 'lubycon-back'
        //'host': ''
    })
    .constant('SNSKEY', {
    // THIS IS GLOBAL SNSKEY FOR APP
        'facebook':'', //LOCAL
        'instagram':'' //LOCAL
    })
    .constant(); // ADD NEW CONSTANT

})();
