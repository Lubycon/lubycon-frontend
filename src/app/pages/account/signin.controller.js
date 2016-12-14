(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SigninController', [
            '$rootScope', '$scope', '$state', '$filter',
            'Restangular', 'Authentication', 'toastr',
            'Base64Service', 'FacebookService',
            SigninController
        ]);

    /** @ngInject */
    function SigninController(
        $rootScope, $scope, $state, $filter,
        Restangular, Authentication, toastr,
        Base64Service, FacebookService
    ) {
        var vm = this;

        vm.signInfo = {
            email: null,
            password: null,
            snsCode: null
        };

        // PUBLIC METHOD

        vm.signin = signin;
        function signin(signType){
            if(signType === 'email') postData(vm.signInfo);
            else if(signType === 'facebook') {
                FacebookService.get('userData').then(function(res) {
                    vm.signInfo.email = res.email;
                    vm.signInfo.password = Base64Service.encode(res.id);
                    vm.signInfo.snsCode = '0101';

                    postData(vm.signInfo);
                });
            }
            else console.error('signType is not exist');
        }




        // PRIVATE METHOD

        function postData(data) {
            Authentication.signIn.post(
                data, undefined, undefined, {'Content-Type':'application/json'}
            ).then(function (res) {
                console.log(res);
                if(res.status.code === '0000') {
                    Authentication.setCredentials(res.result.token,res.result.condition);
                }
                else {
                    toastr.error($filter('translate')('ERROR.SIGNIN'));
                }
            });
        }
    }
})();
