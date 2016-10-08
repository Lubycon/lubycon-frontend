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
            signIn: Restangular.service('members/signin'),
            signUp: Restangular.service('members/signup'),
            setCredentials: setCredentials,
            updateCredentials: updateCredentials,
            clearCredentials: clearCredentials
        };

        return service;

        function setCredentials(token, memberState, reload) {
            // INIT TOKEN...
            var authdata = token;

            $rootScope.memberState = {
                sign: true,
                condition: memberState
            };

            // SET COOKIE DATA...
            $cookieStore.put('authdata', authdata);
            $cookieStore.put('memberState', $rootScope.memberState);

            // SET HTTP HEADER...
            defaultHeaders = Restangular.defaultHeaders;
            defaultHeaders["X-lubycon-Token"] = authdata;
            Restangular.setDefaultHeaders(defaultHeaders);

            if(memberState === 'active') {
                // GET MEMBER DATA...
                Restangular.all('members/simple').customGET().then(
                    function (res) {
                        if(res.status.code === '0000') {
                            $rootScope.member = res.result;
                            $cookieStore.put('member', $rootScope.member);
                            $location.path('/main');
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
            }
            else if(memberState === 'inactive') {
                $location.path('/certs/code/signup');
            }
            else service.clearCredentials();

            // REFRESH COOKIE...
            $cookieStore.put('memberState', $rootScope.memberState);

            if(reload === 'reload') $window.location.reload();
        }

        function updateCredentials(callback) {
            Restangular.all('members/simple').customGET().then(
                function (res) {
                    $rootScope.member = res.result;
                    $cookieStore.put('member', $rootScope.member);
                }
            );
        }

        function clearCredentials(reload, target) {
            console.log(Restangular.defaultHeaders);
            if(!target) target = '/main';
            if($rootScope.member && ($rootScope.memberState.condition === 'active' || $rootScope.memberState.condition === 'inactive')) {
                Restangular.all('members/signout').customPUT(
                    { memberId: $rootScope.member.id }
                ).then(function () {
                    delete $rootScope.member;

                    // DESTORY TOKEN AND SIGN DATA
                    $cookieStore.remove('authdata');
                    $cookieStore.remove('memberState');
                    if(reload === 'reload') {
                        $location.path(target);
                        $window.location.reload();
                    }
                });
            }
        }
    }
})();
