(function() {
    'use strict';

    angular
        .module('error')
        .controller('ErrorController', ErrorController);

    /* @ngInject */
    function ErrorController(
        $rootScope, $scope, $location, $state, $timeout, $stateParams
    ) {

        console.log("THIS IS ERROR PAGE : " + $stateParams.errorCode);
        var vm = this;

        vm.errorTitle = $stateParams.errorCode;
        vm.errorMessages = {
            404: "Page is not found",
            500: "Server is not response"
        }
        vm.message = vm.errorMessages[vm.errorTitle * 1];

        vm.goHome = goHome;
        vm.goBack = goBack;

        function goHome(){
            $state.go('common.default.main');
        }
        function goBack(){
            location.href = document.referrer;
        }
    }
})();
