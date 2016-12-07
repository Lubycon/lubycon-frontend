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

        vm.errorTitle = $stateParams.errorCode * 1;
        vm.errorMessage = 'ERROR.' + vm.errorTitle;
        $translate([
            vm.errorMessage, 'ERROR.DEFAULT'
        ]).then(function (texts) {
            vm.errorMessage = texts[vm.errorMessage];

            if(/error\./i.test(vm.errorMessage)) {
                vm.errorMessage = texts['ERROR.DEFAULT'];
            }
        });

        vm.goHome = goHome;
        vm.goBack = goBack;

        function goHome(){
            $state.go('common.figure.main');
        }
        function goBack(){
            location.href = document.referrer;
        }
    }
})();
