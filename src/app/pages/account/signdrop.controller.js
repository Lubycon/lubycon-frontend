(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SigndropController', SigndropController);

    /** @ngInject */
    function SigndropController($rootScope, $scope, Restangular, Authentication, toastr) {
        var vm = this;
        var api = Restangular.all('members/signdrop');

        vm.isMobile = $rootScope.deviceInfo.isMobile;

        vm.dropKind = null;
        vm.dropKindList = [{
            code: '0201',
            name: 'Reason0'
        },{
            code: '0202',
            name: 'Reason1'
        },{
            code: '0203',
            name: 'Reason2'
        },{
            code: '0204',
            name: 'Reason3'
        },{
            code: '0205',
            name: 'Reason4'
        },{
            code: '0206',
            name: 'Reason5'
        },{
            code: '0200',
            name: 'ETC'
        }];
        vm.dropReason = null;


        vm.signdrop = signdrop;
        function signdrop(){
            console.log(vm.dropKind,vm.dropReason);
            if(vm.dropKind) {
                Restangular.all('members/signdrop').customPUT(
                    { reasonCode: vm.dropKind, reason: vm.dropReason }
                ).then(function(res) {
                    if(res.status.code === '0000') {
                        Authentication.clearCredentials('reload');
                    }
                });
            }
            else {
                toastr.error('회원탈퇴 이유를 선택해라 닝겐');
            }

        }
    }
})();
