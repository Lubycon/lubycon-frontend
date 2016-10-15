(function() {
    'use strict';

    angular
        .module('error')
        .controller('ErrorController', [
            '$rootScope', '$scope', '$location', '$state',
            '$timeout', '$stateParams', '$translate',
            ErrorController]);

    /* @ngInject */
    function ErrorController(
        $rootScope, $scope, $location, $state, $timeout, $stateParams, $translate
    ) {
        console.log("THIS IS ERROR PAGE : " + $stateParams.errorCode);
        var vm = this;

        vm.errorTitle = $stateParams.errorCode;

        $translate([
            'ERROR.404',
            'ERROR.500'
        ]).then(function (texts) {
            vm.errorMessages = {
                404: texts['ERROR.404'],
                500: texts['ERROR.500']
            }
            vm.message = vm.errorMessages[vm.errorTitle * 1];
        });

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
