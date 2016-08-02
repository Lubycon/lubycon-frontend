(function() {
    'use strict';

    angular
        .module('app')
        .directive('mainHeader', headerDirective);

    /** @ngInject */
    function headerDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/header/header.tmpl.html',
            scope: {},
            controller: HeaderController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function HeaderController($rootScope,$scope,moment,DeviceConfig) {
            var vm = this;
            var DEVICE_CONFIG = DeviceConfig().get();

            vm.isMobile = DEVICE_CONFIG.isMobile;
            console.log("IS THIS MOBILE DEVICE? -> " +  vm.isMobile);

            vm.testMenu = ['Artwork','Vector','3D'];
            vm.testMenu2 = ['Forum','Tutorial','Q&A'];
        }
    }

})();
