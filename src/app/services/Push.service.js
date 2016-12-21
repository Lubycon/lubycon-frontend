(function () {
    'use strict';

    angular
        .module('services')
        .factory('PushService', [
            '$rootScope', '$interval', 'toastr',
            PushService
        ]);

    function PushService($rootScope, $interval, toastr) {

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
                    console.log(count);
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

            var publicChannel = pusher.subscribe('lubycon-public'),
                channel;

            if($rootScope.member) {
                channel = pusher.subscribe('lubycon-private-'+$rootScope.member.id);
                console.log('PUSH CHANNEL -> ', 'lubycon-private-'+$rootScope.member.id);
            }


            channel.bind('pushEvent', function(data) {
                console.log('private : ',data);
            });

            publicChannel.bind('pushEvent', function(data) {
                console.log('public : ',data);
            });
        }
    }
})();
