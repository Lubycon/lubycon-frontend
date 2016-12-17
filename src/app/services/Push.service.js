(function () {
    'use strict';

    angular
        .module('services')
        .factory('PushService', ['$rootScope', '$interval', PushService]);

    function PushService($rootScope, $interval) {

        var service = {

        };

        init();
        return service;

        // PUBLIC METHOD


        // PRIVATE METHOD

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

        /*
            @name: initPusher
            @desc: init Pusher config
            @params: null
            @return Void
        */
        function initPusher() {
            Pusher.logToConsole = false;

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
