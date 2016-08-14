(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .controller('CommunityController', CommunityController);

    /** @ngInject */
    function CommunityController($rootScope,$scope) {
        var vm = this;
        //DUMMY DATA
        vm.lists = [
            {
                content:{
                    code: 0,
                    title: "Test Row",
                    comment: 17,
                    like: 21,
                    view: 16,
                    date: "2016-08-14"
                },
                userData:{
                    code: 0,
                    name: "Test Member",
                    profile: "user/3/profile.jpg"
                }
            },
            {
                content:{
                    code: 1,
                    title: "Test Row1",
                    comment: 22,
                    like: 6,
                    view: 52,
                    date: "2016-08-14"
                },
                userData:{
                    code: 1,
                    name: "Test Member1",
                    profile: "user/5/profile.jpg"
                }
            },
            {
                content:{
                    code: 3,
                    title: "Test Row2",
                    comment: 7,
                    like: 81,
                    view: 105,
                    date: "2016-08-14"
                },
                userData:{
                    code: 2,
                    name: "Test Member2",
                    profile: "user/0/profile.jpg"
                }
            }
        ];
        //DUMMY DATA
        console.log(vm.lists);

    }
})();
