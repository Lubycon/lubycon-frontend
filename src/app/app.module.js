(function() {
  'use strict';

  angular
    .module('app', [
        'common',
        'components',
        'app.pages',
        'error',

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
    .constant('CONSOLE_LOG', true) // REAL SERVER -> false
    .constant('API_CONFIG', {
    // THIS IS SERVER LOCATION SWITCH
        'host': '' // MY LOCAL
        //'host': ''
    })
    .constant('SNSKEY', {
    // THIS IS GLOBAL SNSKEY FOR APP
        'facebook':'', //LOCAL
        'instagram':'' //LOCAL
    })
    .constant(); // ADD NEW CONSTANT

})();
