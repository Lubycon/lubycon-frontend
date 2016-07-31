(function() {
  'use strict';

  angular
    .module('lubyconWebApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
