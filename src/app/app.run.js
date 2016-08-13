(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope,DeviceConfig) {
    console.log("APP RUNNING - ");
    console.log($rootScope);

    // SET DEVICE INFO...
    $rootScope.deviceInfo = DeviceConfig().get();

    $log.debug('runBlock end');
  }

})();
