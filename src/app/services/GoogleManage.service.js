/*
    @title: GoogleManage.service.js
    @desc: Google SDK control
    @author: Evan moon
    @created_at: 2016-12-17
    @updated_at: 2016-12-18
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
        var google = 'https://people.googleapis.com/v1';
        var service = {
            init: init,
            login: login,
            logout: logout,
            get: get,
            getPrimaryData: getPrimaryData
        };

        return service;

        // PUBLIC METHODS //

        /*
            @name: init
            @desc: loading and do init Google plus SDK
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
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/userinfo.email'
            ];

            gapi.auth.authorize({
                client_id: SNS_KEYS.google.client_id,
                scope: scope.join(' '),
                cookiepolicy: "single_host_origin",
                immediate: false,
                authuser: ''
            }, function(res) {
                if(res) defer.resolve(res);
                else defer.reject(res);
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
                defer.resolve(res);
            });

            return defer.promise;
        }

        /*
            @name: get
            @desc: call method from String param
            @params: endPoint(String)
            @return Promise
        */
        function get(endPoint) {
            var defer = $q.defer();

            login()
            .then(function(res) {
                console.log(res);
                return res.access_token;
            })
            .then(function(accessToken) {
                return callAPI(accessToken, getEndpoint(endPoint));
            })
            .then(function(res) {
                if(res) defer.resolve(res.data);
                else defer.reject();
            });

            return defer.promise;
        }

        /*
            @name: getPrimaryData
            @desc: return primary data from Google API
            @params: arr(Array)
            @return Object
        */
        function getPrimaryData(arr) {
            var output = null;

            arr.some(function(v) {
                output = v;
                return v.metadata.primary;
            });

            return output;
        }




        // PRIVATE METHOD

        /*
            @name: callApi
            @desc: return data from Google Restful API
            @params: accessToken(String), endPoint(String)
            @return Promise
        */
        function callAPI(accessToken, endpoint) {
            return $http.jsonp(google + endpoint, {
                method: 'GET',
                params: {
                    key: SNS_KEYS.google.api_key,
                    callback: 'JSON_CALLBACK',
                    access_token: accessToken
                }
            });
        }

        /*
            @name: getEndPoint
            @desc: convert String to Google API URI
            @params: string(String)
            @return String
        */
        function getEndpoint(string) {
            switch(string) {
                case 'user' : return '/people/me';
                default : return '/people/me';
            }
        }
    }
})();
