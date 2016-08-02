(function() {
  'use strict';

  angular
    .module('app', [
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
    .constant('API_CONFIG', {
        'host':'localhost' // MY LOCAL...
    })
    .constant(); // ADD NEW CONSTANT

})();
