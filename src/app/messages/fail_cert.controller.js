(function() {
    'use strict';

    angular
        .module('messages')
        .controller('FailCertMessageController', [
            '$rootScope', '$scope', '$location', '$state',
            '$timeout', '$stateParams', '$translate',
            FailCertMessageController
        ]);

    /* @ngInject */
    function FailCertMessageController(
        $rootScope, $scope, $location, $state, $timeout, $stateParams, $translate
    ) {
        var vm = this;

        vm.message = {
            animation: 'bounceInDown',
            icon: 'fa-times',
            iconColor: 'red',
            iconAnimation: '',
            title: 'Certification Code is Wrong',
            content: 'Please make sure your mail',
            buttons: [
                {
                    func: goToBack,
                    content: 'TRY AGAIN'
                }
            ]
        };

        function goToBack(){
            var fromLocation = $rootScope.clientLocation.from;
            $state.go(fromLocation.url,fromLocation.params);
        }
    }
})();
