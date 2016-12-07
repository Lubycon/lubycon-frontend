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
            '$state', '$filter',
            Tracker
        ]);


    function Tracker(
        $rootScope, CookieService, Restangular, $state, $filter
    ){
        var tracker = {},
            today = $filter('date')(new Date(), 'yyyyMMdd');

        var _TUUID = setTUUID(CookieService.get('TRACKER'));
        var _OBJECT_INFO = CookieService.get('SHARED_OBJECT') || null; // host/shared/:snsCode/:objectCode/:objectId/:message를 통해 페이지에 접속했을 경우 생성되는 쿠키

        // PUBLIC
        var service = {
            stored: {}, // post메소드 호출 시 현재 요청보다 한 스텝 이전 트래킹 데이터를 저장한다
            storedCookie: null,
            init: function() {
                tracker.actionType = 0;
            },
            post : function(toUrl,fromUrl,toParams,fromParams) {
                console.log('TRACKER POST START','to -> ',toUrl,toParams,'from -> ',fromUrl,fromParams);
                ///////////////////////////////////////////////////////////////////
                // common.run.js -> stateChange 이벤트 발생시 호출되는 트래킹 메소드
                ///////////////////////////////////////////////////////////////////

                this.init();

                tracker.tuuid = _TUUID.id;
                tracker.clientCurrentUrl = toUrl;
                tracker.clientPrevUrl = fromUrl;

                var toId = getId(toUrl, toParams),
                    fromId = getId(fromUrl, fromParams),
                    memberId = getMemberId();
                console.log(toId,fromId,memberId,_OBJECT_INFO);

                if(toId) tracker.clientCurrentId = toId * 1;
                if(fromId) tracker.clientPrevId = fromId * 1;
                if(memberId) tracker.memberId = memberId * 1;


                getCookieData();
                service.setStore();

                postAPI(tracker).then(function(res) {
                    trace(tracker);
                });
            },
            setParam: function(params, callback) {
                /////////////////////////////////////////////////////////
                // 어떠한 특수 액션이 발생했을때 param을 변경해서 보낸다.
                // 1회성 리퀘스트이며 이 요청이 끝나면 tracker는 stored에 저장해놨던
                // 전번 요청으로 init한뒤 추적을 계속한다
                /////////////////////////////////////////////////////////

                console.log('SET PARAM',params);
                getCookieData();

                var _data = service.getStore(),
                    check = true;

                if(typeof params === 'number') {
                    _data.actionType = params;
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
                else console.error('Site Tracker got error');
            },
            getTracker: function() {
                return tracker;
            },
            setStore: function() {
                this.stored = tracker;
            },
            getStore: function() {
                return angular.copy(this.stored);
            }
        };



        // PRIVATE
        function debug() {

        }

        function validator(key) { // return --> Boolean
            var params = [
                'actionType',
                'objectCode',
                'objectId',
                'snsCode',
                'joinYn',
                'clientCurrentUrl',
                'clientCurrentId',
                'clientPrevUrl',
                'clientPrevId',
                'tuuid',
                'messageId',
                'deviceType',
                'shareUrl',
                'parentUrl',
                'contentId'
            ];

            return params.indexOf(key) > -1 ? true : false;
        }

        function getCookieData() {
            var data = CookieService.get('SHARED_OBJECT');
            console.log(data);

            if(data && data.date === today) { // 공유된 게시물을 타고 들어온 사용자 예외처리
                tracker.objectCode = getObjectCode(data.objectCode);
                tracker.objectId = data.objectId;
                tracker.snsCode = data.snsCode;
                tracker.messageId = data.message;

                if(tracker.objectCode && tracker.objectCode === '0408') {
                    ///////////////////////////////////////////////////////////////
                    // 위젯은 messageId필드에 contentId값을 담아서 보낸다.
                    // messageId를 contentid에 담아주고 messageId는 0으로 바꿔줘야 한다.
                    ///////////////////////////////////////////////////////////////
                    tracker.contentId = tracker.messageId;
                    tracker.messageId = 0;
                    console.log(tracker.contentId,tracker.messageId);
                }
            }
        }

        function getActionTypeDesc(actionType) { // return -> String
            /////////////////////////////////////////////////
            // trace 메소드에 사용되는 actionType명세이다.
            // 임의의 코드와 설명문을 등록하면 trace에서 출력된다.
            /////////////////////////////////////////////////

            switch(actionType) {
                default : return '';
            }
        }

        function postAPI(tracker) { // return -> Promise
            // return Restangular.all('site-tracker').customPOST(tracker);
        }

        function setTUUID(tuuid) { // return -> Object
            /////////////////////////////////////////////////////////////////////////////
            // 쿠키에 기존 tuuid가 등록되어있고 그 쿠키의 날짜가 오늘일 경우에만 기존 tuuid를 사용
            /////////////////////////////////////////////////////////////////////////////

            var result;
            if(tuuid && tuuid.date === today) {
                result = {
                    id: tuuid.id,
                    date: tuuid.date
                };
            }
            else {
                result = {
                    id: createRandomKey(),
                    date: today
                };
                CookieService.put('TRACKER', result);
            }
            return result;
        }

        function getObjectCode(code) { // return -> String
            switch(code) {
                case 'member' : return '0401';
                case 'brand' : return '0402';
                case 'product' : return '0403';
                case 'campaign' : return '0404';
                case 'review' : return '0405';
                case 'ask' : return '0406';
                case 'widget' : return '0408';
                default : return '0400';
            }
        }

        function createRandomKey() { // return -> String32
            var randomValue = Math.random() * (Math.pow(10, 21));
            var randomValue2 = Math.random() * (Math.pow(10,11));
            return (randomValue.toFixed(0) + randomValue2.toFixed(0));
        }

        function getId(url,obj) { // return -> String || null
            ///////////////////////////////////////
            // URL에서 오브젝트 ID를 검출하는 메소드
            ///////////////////////////////////////
            var path = url.split("/"),
                filteredPath = path.filter(function(v){
                    return /^:+.*[id]$/i.test(v);
                }),
                selector = filteredPath[filteredPath.length - 1] ? filteredPath[filteredPath.length - 1].replace(":","") : null;
            console.log(filteredPath, selector, obj[selector]);
            return selector ? obj[selector] : null;
        }

        function getMemberId() { // return -> String
            ///////////////////////////////////////
            // 토큰에서 멤버 ID를 검출하는 메소드
            ///////////////////////////////////////
            var header = Restangular.defaultHeaders['X-08liter-Token'],
                id = header ? header.substring(33) : null;
            return id;
        }
    }
})();
