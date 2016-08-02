(function() {
  'use strict';

  angular
  .module('app')
  .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/pages/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    });

    $urlRouterProvider.otherwise('/');
  }

})();
