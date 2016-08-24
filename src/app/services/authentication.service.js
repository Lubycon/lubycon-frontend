(function () {
    'use strict';

    angular
        .module('app')
        .factory('Authentication', Authentication);

    function Authentication($cookieStore, $cookies, $rootScope, Restangular, $window, $location) {

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
            $rootScope.memberState = { sign: true, state: null };

            // SET COOKIE DATA...
            $cookieStore.put('authToken', authdata);
            $cookieStore.put('memberState', $rootScope.memberState);

            // SET HTTP HEADER...
            defaultHeaders = Restangular.defaultHeaders;
            defaultHeaders["X-lubycon-Token"] = authdata;
            Restangular.setDefaultHeaders(defaultHeaders);

            // GET MEMBER DATA...
            Restangular.all('members/simple/').get().then(
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
            $cookieStore.put('memberState', $rootScope.memberState);

            if(reload === 'reload') {
                $location.path('/main');
                $window.location.reload();
            }
        }

        function updateCredentials(callback) {
            Restangular.one('members/simple/').get().then(
                function (res) {
                    $rootScope.member = res.result;
                    $cookieStore.put('member', $rootScope.member);
                }
            );
        }

        function clearCredentials(reload, target, flag) {
            console.log(Restangular.defaultHeaders);
            if(!target) target = '/main';
            if($rootScope.memberState && $rootScope.member && !flag) {
                Restangular.all('member/signout').customPUT().then(
                    function () {
                        if(reload === 'reload') {
                            $location.path(target);
                            $window.location.reload();
                        }
                    }
                );
            }
            else {

            }
            // CLEAR ROOT...
            $rootScope.memberState = { sign: false, state: null };

            // DESTORY TOKEN AND SIGN DATA
            $cookieStore.remove('authToken');
            $cookieStore.remove('memberState');
        }
    }
})();
