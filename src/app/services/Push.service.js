(function () {
    'use strict';

    angular
        .module('services')
        .factory('PushService', ['$rootScope', '$interval', PushService]);

    function PushService($rootScope, $interval) {

        var service = {
            init: init
        };

        return service;

        // PUBLIC METHOD

        /*
            @name: init
            @desc: loading and do init Pusher SDK
            @params: null
            @return Void
        */
        function init() {
            var count = 0,
                interval;

            if(typeof Pusher !== 'undefined') initPusher();
            else {
                interval = $interval(function() {
                    console.log('pusher sdk load : ', count);
                    if(count > 500) {
                        $interval.cancel(interval);
                        console.error('Pusher SDK loading is failed');
                        return false;
                    }
                    if(typeof Pusher !== 'undefined') {
                        initPusher();
                        $interval.cancel(interval);
                    }
                    else count++;
                });
            }
        }

        // PRIVATE METHOD

        /*
            @name: initPusher
            @desc: init Pusher config
            @params: null
            @return Void
        */
        function initPusher() {
            Pusher.logToConsole = true;

            var pusher = new Pusher('fd5230aae8574f4d60cc', {
                cluster: 'ap1',
                encrypted: true
            });

            var channel = pusher.subscribe('lubycon-notifications');
            channel.bind('pushEvent', function(data) {
                console.log(data);
            });
        }
    }
})();
