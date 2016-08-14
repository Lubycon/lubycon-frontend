(function() {
    'use strict';

    angular
        .module('app.pages.contents')
        .controller('ContentsController', ContentsController);

    /** @ngInject */
    function ContentsController($rootScope,$scope) {
        var vm = this;

        // DUMMY DATA
        vm.contents = [
            {
                code : 1,
                title: "TEST CARD",
                category: "3D",
                image: "contents/threed/Adrian_Joy20160414050808/thumbnail/thumbnail.jpg",
                license: "Free",
                bookmark: true,
                userDirectory: "contents/threed/Adrian_Joy20160414050808/",
                userData: {
                    code: 1,
                    name: "Test User",
                    profile: "user/1/profile.jpg"
                },
                contentCount: {
                    view: 15,
                    comment: 23,
                    like: 12
                }
            },
            {
                code : 2,
                title: "TEST CARD",
                category: "3D",
                image: "contents/threed/Adrian_Joy20160414050808/thumbnail/thumbnail.jpg",
                license: "Free",
                bookmark: true,
                userDirectory: "contents/threed/Adrian_Joy20160414050808/",
                userData: {
                    code: 1,
                    name: "Test User",
                    profile: "user/1/profile.jpg"
                },
                contentCount: {
                    view: 15,
                    comment: 23,
                    like: 12
                }
            },
            {
                code : 3,
                title: "TEST CARD",
                category: "3D",
                image: "contents/threed/Adrian_Joy20160414050808/thumbnail/thumbnail.jpg",
                license: "Free",
                bookmark: true,
                userDirectory: "contents/threed/Adrian_Joy20160414050808/",
                userData: {
                    code: 1,
                    name: "Test User",
                    profile: "user/1/profile.jpg"
                },
                contentCount: {
                    view: 15,
                    comment: 23,
                    like: 12
                }
            },
            {
                code : 4,
                title: "TEST CARD",
                category: "3D",
                image: "contents/threed/Adrian_Joy20160414050808/thumbnail/thumbnail.jpg",
                license: "Free",
                bookmark: true,
                userDirectory: "contents/threed/Adrian_Joy20160414050808/",
                userData: {
                    code: 2,
                    name: "Test User",
                    profile: "user/2/profile.jpg"
                },
                contentCount: {
                    view: 15,
                    comment: 23,
                    like: 12
                }
            },
            {
                code : 5,
                title: "TEST CARD",
                category: "3D",
                image: "contents/threed/Adrian_Joy20160414050808/thumbnail/thumbnail.jpg",
                license: "Free",
                bookmark: true,
                userDirectory: "contents/threed/Adrian_Joy20160414050808/",
                userData: {
                    code: 5,
                    name: "Test User",
                    profile: "user/5/profile.jpg"
                },
                contentCount: {
                    view: 15,
                    comment: 23,
                    like: 12
                }
            }
        ];
        // DUMMY DATA
    }
})();
