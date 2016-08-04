(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($logProvider, toastrConfig) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 2000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = false;
        toastrConfig.preventOpenDuplicates = true;
        toastrConfig.progressBar = true;
        toastrConfig.maxOpened = 10;
        toastrConfig.autoDismiss = false;
    }

})();
