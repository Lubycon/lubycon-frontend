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
                    if(count > 1500) {
                        $interval.cancel(interval);
                        console.error('Pusher SDK loading is failed');
                        return false;
                    }
                    if(typeof Pusher !== 'undefined') {
                        console.log('PUSHER SDK IS LOADED');
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
            Pusher.logToConsole = false;

            var pusher = new Pusher('fd5230aae8574f4d60cc', {
                authEndpoint: '/pusher_auth.php',
                auth: {
                    headers: {
                        'X-CSRF-Token': "SOME_CSRF_TOKEN"
                    }
                },
                cluster: 'ap1',
                encrypted: true
            });

            var publicChannel = pusher.subscribe('public'),
                channel;

            // if($rootScope.member) {
            //     channel = pusher.subscribe('private-'+$rootScope.member.id);
            //     console.log('PUSH CHANNEL -> ', 'private-'+$rootScope.member.id);
            //     channel.bind('pushEvent', function(data) {
            //         console.log('private : ',data);
            //     });
            // }


            publicChannel.bind('pushEvent', function(data) {
                console.log('public : ',data);
            });
        }
    }
})();
