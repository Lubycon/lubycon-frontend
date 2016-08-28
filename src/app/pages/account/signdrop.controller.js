(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SigndropController', SigndropController);

    /** @ngInject */
    function SigndropController($rootScope, $scope, Restangular, Authentication) {
        var vm = this;
        var api = Restangular.all('members/signdrop');

        vm.isMobile = $rootScope.deviceInfo.isMobile;

        vm.dropKind = null;
        vm.dropKindList = ['Reason A','Reason B','Reason C','etc...'];
        vm.dropReason = null;


        vm.signdrop = signdrop;
        function signdrop(){
            console.log(vm.dropKind);
        }
    }
})();
