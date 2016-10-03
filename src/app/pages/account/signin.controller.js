(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('SigninController', SigninController);

    /** @ngInject */
    function SigninController($rootScope, $scope, $state, Restangular, Authentication, toastr) {
        var vm = this;

        vm.signInfo = {
            email: null,
            password: null,
            snsCode: null,
            os: null,
            modelInfo: $rootScope.deviceInfo.detail
        };

        vm.signin = signin;
        function signin(){
            console.log(Authentication,vm.signInfo);

            Authentication.signIn.post(
                vm.signInfo, undefined, undefined, {'Content-Type':'application/json'}
            ).then(function (res) {
                console.log(res);
                if(res.status.code === '0000') {
                    Authentication.setCredentials(res.token,'reload');
                }
            });
        }
    }
})();


// jdbc:mysql://zeliter-app-test.cangewyjzrdn.ap-northeast-1.rds.amazonaws.com:3306/zeliter?useUnicode=true&amp;characterEncoding=UTF8&amp;logger=com.mysql.jdbc.log.Slf4JLogger&amp;profileSQL=true&amp;rewriteBatchedStatements=true
