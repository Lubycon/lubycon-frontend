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
        .factory('FacebookService', [
            '$q', 'CookieService', '$filter',
            '$interval', '$window', 'SNS_KEYS', '$rootScope',
            FacebookService
        ])
    ;

    function FacebookService(
        $q, CookieService, $filter,
        $interval, $window, SNS_KEYS, $rootScope
    ) {

        var service = {
            login: login,
            logout: logout,
            get: get,
            put: put
        };

        var appInfo = {
            appId: SNS_KEYS.facebook,
            status: true,
            cookie: true,
            xfbml: false,
            version: 'v2.8'
        };

        init();
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

            if(typeof FB !== 'undefined') FB.init(appInfo);
            else {
                interval = $interval(function() {
                    if(count > 500) {
                        $interval.cancel(interval);
                        console.error('Facebook SDK loading is failed');
                        return false;
                    }
                    if(typeof FB !== 'undefined') {
                        FB.init(appInfo);
                        $interval.cancel(interval);
                    }
                    else count++;
                });
            }
        }

        /*
            @name: login
            @desc: call FB.login method after checking login status
            @params: null
            @return Promise
        */
        function login() {
            var defer = $q.defer();

            var scope = [
                'email', 'public_profile', 'user_friends'
            ].join(',');

            getLoginStatus().then(function(res) {
                if(res.status === 'connected') defer.resolve(res.authResponse);
                else {
                    FB.login(function(res) {
                        if(!res || res.error) {
                            defer.reject(res);
                        }
                        else defer.resolve(res.authResponse);
                    },{
                        scope: scope,
                        return_scopes: true
                    });
                }
            });

            return defer.promise;
        }

        /*
            @name: logout
            @desc: call FB.logout method
            @params: null
            @return Promise
        */
        function logout() {
            var defer = $q.defer;

            FB.logout(function(res) {
                if(!res) defer.reject(res);
                else defer.resolve(res);
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
                call(functionName, res).then(function(res) {
                    console.log('FACEBOOK GET => ', res);
                    defer.resolve(res);
                }, function(err) {
                    defer.reject(err);
                });
            });

            return defer.promise;
        }

        /*
            @name: put
            @desc: call method from String param and passing arguments to function
            @params: functionName(String), params(Object)
            @return Promise
        */
        function put(functionName, params) {
            var defer = $q.defer();

            if(getAPIType(functionName) === 'ui') {
                call(functionName, null, params).then(function(res) {
                    defer.resolve(res);
                }, function(err) {
                    defer.reject(err);
                });
            }
            else {
                login().then(function(res) {
                    call(functionName, res, params).then(function(res) {
                        defer.resolve(res);
                    }, function(err) {
                        defer.reject(err);
                    });
                });
            }

            return defer.promise;
        }







        // PRIVATE METHODS //

        /*
            @name: getLoginStatus
            @desc: call FB.getLoginStatus
            @params: null
            @return Promise
        */
        function getLoginStatus() {
            var defer = $q.defer();
            FB.getLoginStatus(function(res) {
                if(!res) defer.reject(res);
                else defer.resolve(res);
            });

            return defer.promise;
        }

        /*
            @name: userData
            @desc: getting User data from FB SDK
            @params: auth(Object)
            @return Promise
        */
        function userData(auth) {
            var defer = $q.defer();

            var params = [
                'name', 'email', 'gender',
                'locale', 'family{relationship}',
                'friends', 'picture.height(500)'
            ].join(',');

            FB.api('/me', 'GET', { fields: params }, function(res) {
                res.authResponse = auth;

                if(!res || res.error) defer.reject(res);
                else defer.resolve(res);
            });

            return defer.promise;
        }

        /*
            @name: share
            @desc: sharing feed data to Facebook
            @params: auth(Object), params(Object)
            @return Promise
        */
        function share(auth, params) {
            var defer = $q.defer();
            params.method = 'feed';

            FB.ui(params, function(res) {
                if(!res || res.error || !res.post_id) defer.reject(res);
                else defer.resolve(res);
            });

            return defer.promise;
        }

        /*
            @name: setStore
            @desc: saving facebook authenticated data to cookie
            @params: data(Object)
            @return Void
        */
        function setStore(data) {
            CookieService.put('facebook', data);
        }

        /*
            @name: getStore
            @desc: getting facebook authenticated data from cookie
            @params: null
            @return Object
        */
        function getStore() {
            return CookieService.get('facebook') || {};
        }

        /*
            @name: call
            @desc: excuting function in this service by String
            @params: functionName(String), auth(Object), params(Object)
            @return Function
        */
        function call(functionName, auth, params) {
            return eval(functionName)(auth,params);
        }

        /*
            @name: getAPIType
            @desc: returning used api type in function (FB.api || FB.ui)
            @params: functionName(String)
            @return String
        */
        function getAPIType(functionName) {
            var regx = /(\.ui)/gi,
                functionString = eval(functionName).toString();

            if(regx.test(functionString)) return 'ui';
            else return 'api';
        }
    }
})();
