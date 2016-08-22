(function () {
    'use strict';

    angular
        .module('app')
        .factory('Authentication', Authentication);

    function Authentication($cookieStore, $cookies, $rootScope, Restangular, $window, $location) {
        // signin 시도
        // 토큰 발급
        var defaultHeaders = Restangular.defaultHeaders;
        Restangular.setDefaultHeaders(defaultHeaders);
        console.log(defaultHeaders);

        var service = {
            signin: Restangular.service('members/signin'),
            signup: Restangular.service('members/signup'),
            setCredentials: setCredentials,
            updateCredentials: updateCredentials,
            clearCredentials: clearCredentials
        };

        return service;

        function setCredentials(token, reload) {
            // INIT TOKEN...
            var authdata = token;
            $rootScope.sign = { sign: true };

            // SET COOKIE DATA...
            $cookieStore.put('authToken', authdata);
            $cookieStore.put('sign', $rootScope.sign);

            // SET HTTP HEADER...
            defaultHeaders = Restangular.defaultHeaders;
            defaultHeaders["X-lubycon-Token"] = authdata;
            Restangular.setDefaultHeaders(defaultHeaders);

            // GET MEMBER DATA...
            Restangular.all('members/simple/' + defaultHeaders['X-lubycon-Token']).get().then(
                function (res) {
                    if(res.status.code === '0000') {
                        $rootScope.member = res.result;
                        $cookieStore.put('member', $rootScope.member);
                    }
                    else {
                        console.log(res.status);
                        service.clearCredentials();
                    }
                },
                function (err) {
                    console.log(err);
                    service.clearCredentials('reload');
                }
            );

            // REFRESH COOKIE...
            $cookieStore.put('globals', $rootScope.sign);

            if(reload === 'reload') {
                console.log($rootScope.referer);
                $location.path('/main');
                $window.location.reload();
            }
        }

        function updateCredentials(callback) {
            Restangular.one('members/simple/' + defaultHeaders['X-lubycon-Token']).get().then(
                function (userDetail) {
                    $rootScope.member = userDetail.result;
                    $cookieStore.put('member', $rootScope.member);
                    //callback($rootScope.member);
                }
            );
        }

        function clearCredentials(reload, target, flag) {
            console.log(Restangular.defaultHeaders);
            if(!target) target = '/main';
            if($rootScope.sign && $rootScope.member && !flag) {
                Restangular.all('member/signout').customPUT().then(function () {
                    if(reload === 'reload') {
                        $location.path(target);
                        $window.location.reload();
                    }
                });
            }
            else {

            }
            // CLEAR ROOT...
            $rootScope.sign = {};

            // DESTORY TOKEN AND SIGN DATA
            $cookieStore.remove('authToken');
            $cookieStore.remove('sign');
        }
    }
})();
