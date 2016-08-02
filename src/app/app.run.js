(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope) {
    console.log("APP RUNNING - ");
    console.log($rootScope);
    $log.debug('runBlock end');
  }

})();
