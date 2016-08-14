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
                userDirectory: "user/1/profile.jpg",
                userData: {
                    code: 1,
                    name: "Test User",
                    profile: "#"
                },
                contentCount: {
                    view: 15,
                    comment: 23,
                    like: 12
                }
            },
            {
                code : 12,
                title: "TEST CARD2",
                category: "3D",
                image: "#",
                license: "Not Free",
                bookmark: true,
                userDirectory: "/",
                userData: {
                    code: 1,
                    name: "Test User2",
                    profile: "#"
                },
                contentCount: {
                    view: 15,
                    comment: 23,
                    like: 12
                }
            },
            {
                code : 50,
                title: "TEST CARD3",
                category: "3D",
                image: "#",
                license: "Free",
                bookmark: true,
                userDirectory: "/",
                userData: {
                    code: 1,
                    name: "Test User3",
                    profile: "#"
                },
                contentCount: {
                    view: 11,
                    comment: 23,
                    like: 12
                }
            },
            {
                code : 2950,
                title: "TEST CARD4",
                category: "Vector",
                image: "#",
                license: "Free",
                bookmark: true,
                userDirectory: "/",
                userData: {
                    code: 215,
                    name: "Test User5",
                    profile: "#"
                },
                contentCount: {
                    view: 25,
                    comment: 1,
                    like: 0
                }
            },
            {
                code : 117,
                title: "TEST CARD6",
                category: "3D",
                image: "#",
                license: "Free",
                bookmark: true,
                userDirectory: "/",
                userData: {
                    code: 1,
                    name: "Test User11",
                    profile: "#"
                },
                contentCount: {
                    view: 204,
                    comment: 0,
                    like: 0
                }
            }
        ];
        // DUMMY DATA
    }
})();
