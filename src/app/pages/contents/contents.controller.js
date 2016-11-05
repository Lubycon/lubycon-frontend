(function() {
    'use strict';

    angular
        .module('app.pages.contents')
        .controller('ContentsController', [
            '$rootScope', '$scope', 'getFilterData', ContentsController
        ]);

    /** @ngInject */
    function ContentsController($rootScope, $scope, getFilterData) {
        var vm = this;

        // DUMMY DATA
        vm.contents = [{
            id : 1,
            title: "The Girl",
            category: "3D",
            image: "https://scontent-icn1-1.cdninstagram.com/t51.2885-15/s750x750/sh0.08/e35/14714541_607631282760789_8741561106645909504_n.jpg?ig_cache_key=MTM3MTc5MjcyMDA3NTIxMzUyOQ%3D%3D.2",
            license: "Free",
            bookmark: true,
            userData: {
                id: 1,
                name: "Adrian Joy",
                profile: "user/1/profile.jpg"
            },
            contentCount: {
                view: 15,
                comment: 23,
                like: 12
            }
        },{
            id : 2,
            title: "Prison",
            category: "3D",
            image: "https://scontent-icn1-1.cdninstagram.com/t51.2885-15/sh0.08/e35/p750x750/14733357_144357662698411_9131144726639017984_n.jpg?ig_cache_key=MTM2OTcxOTQ2MzMyNzE2OTMxNA%3D%3D.2",
            license: "Free",
            bookmark: false,
            userData: {
                id: 1,
                name: "Audrey Wickham",
                profile: "user/15/profile.jpg"
            },
            contentCount: {
                view: 15,
                comment: 23,
                like: 12
            }
        },{
            id : 3,
            title: "진가쿠노 쿄진 리바이 헤이죠",
            category: "3D",
            image: "https://scontent-icn1-1.cdninstagram.com/t51.2885-15/e35/14677334_211252245964924_6353392409115623424_n.jpg?ig_cache_key=MTM2NjA3NDcwMzY1NTk3MTA0OA%3D%3D.2",
            license: "Free",
            bookmark: true,
            userData: {
                id: 1,
                name: "Robert Beasley",
                profile: "user/1/profile.jpg"
            },
            contentCount: {
                view: 15,
                comment: 23,
                like: 12
            }
        },{
            id : 4,
            title: "옴닉",
            category: "3D",
            image: "https://scontent-icn1-1.cdninstagram.com/t51.2885-15/e35/14730475_317621848605004_4781162743572987904_n.jpg?ig_cache_key=MTM2MTcwNDEyODA1NzY3MzUzMw%3D%3D.2",
            license: "Free",
            bookmark: false,
            userData: {
                id: 2,
                name: "Steven Watkins",
                profile: "user/2/profile.jpg"
            },
            contentCount: {
                view: 15,
                comment: 23,
                like: 12
            }
        },{
            id : 5,
            title: "Sad romance",
            category: "3D",
            image: "https://scontent-icn1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/14350488_1757973007786990_8998723841156972544_n.jpg?ig_cache_key=MTM0ODc3Mzc4MzAxNjM4NTY5NA%3D%3D.2.c",
            license: "Free",
            bookmark: true,
            userData: {
                id: 5,
                name: "Terence Bingham",
                profile: "user/5/profile.jpg"
            },
            contentCount: {
                view: 15,
                comment: 23,
                like: 12
            }
        }];
        // DUMMY DATA

        // BIND FILTERS...
        vm.filterData = {
            category: null,
            license: null,
            sort: null
        };
        vm.filters = [{
            icon: 'fa-bars',
            options: getFilterData.result.contentSort,
            data: vm.filterData.category
        },
        {
            icon: 'fa-creative-commons',
            options: getFilterData.result.contentSort,
            data: vm.filterData.license
        },
        {
            icon: 'fa-filter',
            options: getFilterData.result.contentSort,
            data: vm.filterData.sort
        }];
        vm.filterSubmit = function() {
            vm.filterData.category = vm.filters[0].data;
            vm.filterData.license = vm.filters[1].data;
            vm.filterData.sort = vm.filters[2].data;
            console.log(vm.filterData);
        };
    }
})();
