(function () {
    'use strict';

    angular
        .module('app')
        .factory('httpInterceptor', ['$rootScope','$injector',httpInterceptor])
        ;

    function httpInterceptor($rootScope, $injector) {

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

                return res;
            }
        };
    }
})();
