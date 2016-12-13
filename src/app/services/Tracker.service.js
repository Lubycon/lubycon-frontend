/***********************************
title : Tracker.js
description: 사용자의 이동경로 및 액션 추적
created_at: 2016. 10. 20
updated_at: 2016. 11. 8
author: Evan Moon
*************************************/

(function () {
    'use strict';

    angular
        .module('app')
        .factory('Tracker', [
            '$rootScope', 'CookieService', 'Restangular',
            '$state', '$filter', 'UUIDService',
            Tracker
        ]);


    function Tracker(
        $rootScope, CookieService, Restangular, $state, $filter, UUIDService
    ){
        var tracker = {},
            today = $filter('date')(new Date(), 'yyyyMMdd');

        var _UUID = setUUID(CookieService.get('TRACKER'));

        var service = {
            stored: {},
            storedCookie: null,
            init: init,
            post : post,
            setParam: setParam,
            getTracker: getTracker,
            setStore: setStore,
            getStore: getStore
        };

        return service;


        // PUBLIC METHOD

        /*
            @name: init
            @desc: init tracker
            @params: null
            @return Void
        */
        function init() {
            tracker.action = 0;
        }

        /*
            @name: post
            @desc: Post user trace to server
            @params: toState(Object), fromState(Object)
            @return Void
        */
        function post(toState, fromState) {
            ///////////////////////////////////////////////////////////////////
            // app.run.js -> stateChange 이벤트 발생시 호출되는 트래킹 메소드
            ///////////////////////////////////////////////////////////////////

            init();

            tracker.uuid = _UUID.id;
            tracker.prevUrl = fromState.url;
            tracker.currentUrl = toState.url;

            var memberId = getMemberId();

            service.setStore();

            postAPI(tracker).then(function(res) {
                trace(tracker);
            });
        }

        /*
            @name: setParam
            @desc: Post specific user actions to the server
            @params: params(Obejct || Int), Callback(Function)
            @return Void
        */
        function setParam(params, callback) {
            /////////////////////////////////////////////////////////
            // 어떠한 특수 액션이 발생했을때 param을 변경해서 보낸다.
            // 1회성 리퀘스트이며 이 요청이 끝나면 tracker는 stored에 저장해놨던
            // 전번 요청으로 init한뒤 추적을 계속한다
            /////////////////////////////////////////////////////////

            console.log('SET PARAM',params);

            var _data = service.getStore(),
                check = true;

            if(typeof params === 'number') {
                _data.action = params;
            }
            else {
                var keys = Object.keys(params);
                var validation;

                keys.map(function(v) {
                    validation = validator(v);
                    if(!validator(v)) {
                        check = false;
                        console.error('Tracker Parameter Exception : "' + v + '" is unavailable value. Therefore this value will be removed from Site Tracker');
                    }
                    else _data[v] = params[v];
                });
            }

            if(check) {
                postAPI(_data).then(function(res) {
                    if(callback) callback();
                    trace(_data, true);
                });
            }
            else console.error('Tracker got error');
        }

        /*
            @name: getTracker
            @desc: Return Current Tracker
            @params: null
            @return Object
        */
        function getTracker() {
            return tracker;
        }

        /*
            @name: setStore
            @desc: Save current Tracker to the service
            @params: null
            @return Void
        */
        function setStore() {
            service.stored = tracker;
        }

        /*
            @name: getStore
            @desc: return stored Tracker
            @params: null
            @return Object
        */
        function getStore() {
            return angular.copy(service.stored);
        }







        // PRIVATE

        /*
            @name: validator
            @desc: Check if it is a valid key
            @params: key(String)
            @return Boolean
        */
        function validator(key) {
            var params = [
                'action',
                'currentUrl',
                'prevUrl',
                'uuid'
            ];

            return params.indexOf(key) > -1 ? true : false;
        }

        /*
            @name: getActionDesc
            @desc: return action description
            @params: action(String)
            @return String
        */
        function getActionDesc(action) {
            /////////////////////////////////////////////////
            // trace 메소드에 사용되는 actionType명세이다.
            // 임의의 코드와 설명문을 등록하면 trace에서 출력된다.
            /////////////////////////////////////////////////

            switch(actionType) {
                default : return '';
            }
        }

        /*
            @name: postAPI
            @desc: post Tracker to the server
            @params: tracker(Object)
            @return Promise
        */
        function postAPI(tracker) { // return -> Promise
            return Restangular.all('tracker').customPOST(tracker);
        }

        /*
            @name: setUUID
            @desc: create tracker unique ID
            @params: uuid(Object)
            @return Object
        */
        function setUUID(uuid) { // return -> Object
            /////////////////////////////////////////////////////////////////////////////
            // 쿠키에 기존 uuid가 등록되어있고 그 쿠키의 날짜가 오늘일 경우에만 기존 uuid를 사용
            /////////////////////////////////////////////////////////////////////////////

            var result;
            if(uuid && uuid.date === today) {
                result = {
                    id: uuid.id,
                    date: uuid.date
                };
            }
            else {
                result = {
                    id: UUIDService.generate('xxxxxxxxxx-xxxxxxxxxx-xxxxxxxxxx'),
                    date: today
                };
                CookieService.put('TRACKER', result);
            }
            return result;
        }

        /*
            @name: getMemberId
            @desc: Return member ID from the access token
            @params: null
            @return String
        */
        function getMemberId() {
            var header = Restangular.defaultHeaders['X-lubycon-Token'],
                id = header ? header.substring(33) : null;
            return id;
        }

        /*
            @name: trace
            @desc: Prints console.log about Tracker
            @params: tracker(Object), isCustom(Boolean)
            @return Void
        */
        function trace(tracker, isCustom) {
            console.log('=====================================[ TRACKER ]===============================');
            console.log(tracker);
            if(!isCustom) console.log('====================================[ DEFAULT ACTION ]==============================');
            else console.log('=================================================================[ ACTION : '+ tracker.action +' -> '+getActionDesc(tracker.action) +' ]');
        }
    }
})();
