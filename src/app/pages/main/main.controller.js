(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, toastr, toastrConfig) {
        var vm = this;
        console.log(toastrConfig);
        vm.testText = "Hello, Lubycon!";
        vm.clickme = "Click me!";
        vm.checker = 0;
        vm.testToast = function(){
            console.log(toastr);
            toastr.info('Thanks! Welcome to Lubycon :)','Test Alert');
            // success, info, error, warning
        };
    }
})();
