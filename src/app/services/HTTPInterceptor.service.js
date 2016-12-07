(function () {
    'use strict';

    angular
        .module('services')
        .factory('httpInterceptor', ['$rootScope', '$injector', httpInterceptor])
        ;

    function httpInterceptor($rootScope, $injector, $state) {

        return {
            response: function (res) { // RESPONSE SUCCEED
                var Authentication = $injector.get('Authentication');

                return res;
            },
            responseError: function(res) { // RESPONSE ERROR
                console.log('========================== !!!GET RESPONSE ERROR!!! ============================');
                console.log('status : ',res.status,' -> ',res.statusText);
                console.log('url : ', res.config.url);
                console.log('method : ',res.config.method);
                console.log('data : ',res.data);
                console.log('old || new : ', res.data && res.data.status ? 'old' : 'new' );
                console.log('=================================================================================');
                console.log($rootScope);
                var $state = $injector.get('$state');

                if(res.status >= 400 && res.status < 500) {
                    // CLIENT ERROR
                    // 클라이언트 에러는 어떻게 처리할 지 고민해볼 것
                    // 2016.12.8 01:45 -evan
                }
                else if(res.status >= 500) {
                    // SERVER ERROR
                    $state.go('full.noFooter.error', {
                        errorCode: res.status
                    });
                }

                return res;
            }
        };
    }
})();
