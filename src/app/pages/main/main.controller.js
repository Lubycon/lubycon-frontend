(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainController', [
            '$rootScope', '$scope', '$timeout', 'toastr', 'toastrConfig', 'API_CONFIG',
            MainController
        ]);

    /** @ngInject */
    function MainController(
        $rootScope, $scope, $timeout, toastr, toastrConfig, API_CONFIG
    ) {
        console.log("MAIN PAGE IS LOADED");

        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;
        vm.contentHost = API_CONFIG.content;
        vm.data = {
            contents: [
                {
                    code: 0,
                    userCode: 0,
                    title: 'The Girl',
                    creator: 'Andrew Shanks',
                    img: 'https://scontent-icn1-1.cdninstagram.com/t51.2885-15/s750x750/sh0.08/e35/14714541_607631282760789_8741561106645909504_n.jpg?ig_cache_key=MTM3MTc5MjcyMDA3NTIxMzUyOQ%3D%3D.2'
                },
                {
                    code: 1,
                    userCode: 0,
                    title: 'Monster',
                    creator: 'Caroline Davies',
                    img: 'https://scontent-icn1-1.cdninstagram.com/t51.2885-15/sh0.08/e35/p750x750/14733357_144357662698411_9131144726639017984_n.jpg?ig_cache_key=MTM2OTcxOTQ2MzMyNzE2OTMxNA%3D%3D.2'
                },
                {
                    code: 2,
                    userCode: 0,
                    title: '진가쿠노 쿄진 리바이 헤이죠데스',
                    creator: 'Christine Brett',
                    img: 'https://scontent-icn1-1.cdninstagram.com/t51.2885-15/e35/14677334_211252245964924_6353392409115623424_n.jpg?ig_cache_key=MTM2NjA3NDcwMzY1NTk3MTA0OA%3D%3D.2'
                },
                {
                    code: 3,
                    userCode: 0,
                    title: '로보또',
                    creator: 'Gwyn Collins',
                    img: 'https://scontent-icn1-1.cdninstagram.com/t51.2885-15/e35/14730475_317621848605004_4781162743572987904_n.jpg?ig_cache_key=MTM2MTcwNDEyODA1NzY3MzUzMw%3D%3D.2'
                },
                {
                    code: 4,
                    userCode: 0,
                    title: 'Pretty Girl',
                    creator: 'Gwyn Collins',
                    img: 'https://scontent-icn1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/14350488_1757973007786990_8998723841156972544_n.jpg?ig_cache_key=MTM0ODc3Mzc4MzAxNjM4NTY5NA%3D%3D.2.c'
                },
                {
                    code: 5,
                    userCode: 0,
                    title: 'Baby',
                    creator: 'Gwyn Collins',
                    img: 'https://scontent-icn1-1.cdninstagram.com/t51.2885-15/s750x750/sh0.08/e35/14334395_156344121483404_211843987655360512_n.jpg?ig_cache_key=MTM0NjM0MDUzMDAyODM4MjgyNg%3D%3D.2'
                },
                {
                    code: 6,
                    userCode: 0,
                    title: '엘리시움에서 나오는 멋있는 외골격 수트',
                    creator: 'Gwyn Collins',
                    img: 'https://scontent-icn1-1.cdninstagram.com/t51.2885-15/e35/14448405_1273022382715989_6465227524937875456_n.jpg?ig_cache_key=MTM0NDA0ODMzMzQ5NzI5Nzk0NA%3D%3D.2'
                },
                {
                    code: 7,
                    userCode: 0,
                    title: '캡틴 아메리카노',
                    creator: 'Gwyn Collins',
                    img: 'https://scontent-icn1-1.cdninstagram.com/t51.2885-15/e35/14368973_1640670816222785_408821381_n.jpg?ig_cache_key=MTM0MDQ0MDkyNjQyNjUxNjQ1OA%3D%3D.2'
                }
            ],
            bestCreator: {
                profile: 'http://lorempixel.com/640/640/',
                userCode: 0,
                code: 0,
                name: 'Mohammad Anwar',
                job: 'Developer',
                country: 'United State America',
                city: 'New York',
                contentImg: 'http://www.igorstshirts.com/blog/conceptships/2014/evgeny/evgeny_08.jpg',
                contentTitle: 'Best Content Title'
            }
        }

        vm.init = init();

        function init(){
            console.log("init");
        }

    }
})();
