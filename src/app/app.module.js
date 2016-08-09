(function() {
  'use strict';

  angular
    .module('app', [
        'common',
        'components',
        'app.pages',
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
    .constant('CONSOLE_LOG', false) // REAL SERVER -> TRUE
    .constant('API_CONFIG', {
        'host':'localhost' // MY LOCAL...
    })
    .constant('SNSKEY', {

    })
    .constant(); // ADD NEW CONSTANT

})();
