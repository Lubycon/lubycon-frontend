(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, toastr, toastrConfig) {
        var vm = this;


        vm.testText = "Hello, Lubycon!";
        vm.testText2 = "This is Test Grid";

        vm.testToast = function(){
            toastr.success('ng-click is enabled!');
            toastr.info('Thanks! Welcome to Lubycon :)','Test Alert');
            // success, info, error, warning
        };
    }
})();
