/*
    @title: FacebookManage.service.js
    @desc: Facebook SDK control
    @author: Evan moon
    @created_at: 2016-11-29
    @updated_at: 2016-11-30
*/

/*
    - 모든 API호출은 get, put 메소드를 통해 간접호출된다
    - 모든 API호출은 무조건 login메소드를 호출한 뒤 진행된다
    - login메소드에서 연동상태를 검사 후 'connected'를 리턴받지 않았으면 로그인 창을 띄운다
    - 위 과정이 끝나면 call메소드는 전달받은 String을 함수명으로 실행시킨다
    - FB.api는 로그인이 안되어있다면 로그인 메소드를 호출해줘야함
    - FB.ui는 로그인이 안되어있으면 로그인 메소드를 호출하지않아도 자동으로 호출해준다
*/
(function() {
    'use strict';

    angular
        .module('services')
        .factory('GoogleService', [
            '$q', 'CookieService', '$filter', '$http',
            '$interval', '$window', 'SNS_KEYS', '$rootScope',
            GoogleService
        ])
    ;

    function GoogleService(
        $q, CookieService, $filter, $http,
        $interval, $window, SNS_KEYS, $rootScope
    ) {



        var service = {
            init: init,
            login: login,
            get: get
        };

        return service;

        // PUBLIC METHODS //

        /*
            @name: init
            @desc: loading and do init FB SDK
            @params: null
            @return Void
        */
        function init() {
            var count = 0,
                interval;

            if(typeof gapi !== 'undefined') return false;
            else {
                interval = $interval(function() {
                    if(count > 500) {
                        $interval.cancel(interval);
                        console.error('Google SDK loading is failed');
                        return false;
                    }
                    if(typeof gapi !== 'undefined') {
                        console.log(gapi);
                        $interval.cancel(interval);
                        return false;
                    }
                    else count++;
                });
            }
        }

        /*
            @name: login
            @desc: call Google signin method
            @params: null
            @return Promise
        */
        function login() {
            var defer = $q.defer();
            var scope = [
                "https://www.googleapis.com/auth/plus.login",
                "https://www.googleapis.com/auth/plus.profile.emails.read",
                "https://www.googleapis.com/auth/profile.language.read"
            ];
            console.log(scope.join(' '));

            $window.googleLoginCallback = function(res) {
                if(res) {
                    defer.resolve(res);
                }
                else defer.reject(res);
            };

            gapi.auth.signIn({
                clientid: SNS_KEYS.google,
                cookiepolicy: "single_host_origin",
                requestvisibleactions: "http://schemas.google.com/AddActivity",
                scope: scope.join(' '),
                callback: "googleLoginCallback"
            });

            return defer.promise;
        }

        /*
            @name: logout
            @desc: call Google signin method
            @params: null
            @return Promise
        */
        function logout() {
            var defer = $q.defer();

            gapi.auth.signOut(function(res) {
                defer.resolve();
            });

            return defer.promise;
        }

        /*
            @name: get
            @desc: call method from String param
            @params: functionName(String)
            @return Promise
        */
        function get(functionName) {
            var defer = $q.defer();

            login().then(function(res) {
                console.log(res);
                call(functionName).then(function(res) {
                    console.log('GOOGLE GET =>', res, res.placesLived);
                    if(res) defer.resolve(res);
                    else defer.reject();
                });
            });

            return defer.promise;
        }




        // PRIVATE METHOD

        /*
            @name: userData
            @desc: getting User data from Google SDK
            @params: null
            @return Promise
        */
        function userData() {
            var defer = $q.defer();

            gapi.client.load('plus', 'v1', function() {
                gapi.client.plus.people.get( {'userId' : 'me'} )
                .execute(function(res) {
                    if(res) defer.resolve(res);
                    else defer.reject();
                });
            });
            // locales가 안뽑히고 있음 아래의 Oauth2.0으로 시도해볼 것
            // 인스타랑 방법 동일함
            // $http({
            //     url: 'https://people.googleapis.com/v1/people/me?=' + SNS_KEYS.google,
            //     responseType: "json"
            // }).then(function(res) {
            //     console.log(res);
            // });

            return defer.promise;
        }

        /*
            @name: call
            @desc: excuting function in this service by String
            @params: functionName(String), auth(Object), params(Object)
            @return Function
        */
        function call(functionName) {
            return eval(functionName)();
        }
    }
})();
