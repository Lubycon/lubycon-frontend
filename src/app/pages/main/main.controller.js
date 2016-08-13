(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, toastr, toastrConfig) {
        console.log("MAIN PAGE IS LOADED");




        var vm = this;

        vm.testText = "Hello, Lubycon!";
        vm.testText2 = "This is Test Grid";

        vm.testToast = function(){
            toastr.success('ng-click is enabled!');
            toastr.info('Thanks! Welcome to Lubycon :)','Test Alert');
            // success, info, error, warning
        };

        vm.init = init();

        function init(){
            console.log(init);
        }

    }
})();
