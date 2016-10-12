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
            name: 'The service is not suitable for me'
        },{
            code: '0202',
            name: 'Unsatisfying customer service'
        },{
            code: '0203',
            name: 'I am using other service'
        },{
            code: '0200',
            name: 'Other'
        }];
        vm.dropReason = null;


        vm.signdrop = signdrop;
        function signdrop(){
            console.log(vm.dropKind,vm.dropReason);
            if(vm.dropKind && $rootScope.member) {
                Restangular.all('members/signdrop').customPUT(
                    { reasonCode: vm.dropKind, reason: vm.dropReason }
                ).then(function(res) {
                    console.log(res);
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
