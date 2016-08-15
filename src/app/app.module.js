(function() {
  'use strict';

  angular
    .module('app', [
        'common',
        'components',
        'app.pages',
        'error',

        'pascalprecht.translate',
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngMessages',
        'ngAria',
        'restangular',
        'ui.router',
        'ui.bootstrap',
        'toastr'
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
        'host': 'http://localhost:8888/lubycon-web-app-api/', // MY LOCAL
        'content': 'http://localhost:8888/contents/' // MY LOCAL
        //'host': ''
    })
    .constant('SNSKEY', {
    // THIS IS GLOBAL SNSKEY FOR APP
        'facebook':'', //LOCAL
        'instagram':'' //LOCAL
    })
    .constant(); // ADD NEW CONSTANT

})();
