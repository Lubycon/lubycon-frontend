(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .controller('CommunityViewController', CommunityViewController);

    /** @ngInject */
    function CommunityViewController($rootScope, $scope, API_CONFIG) {
        var vm = this;
        vm.contentHost = API_CONFIG.content;
        //DUMMY DATA
        vm.data = {
            contents: {
                code: 0,
                title: 'Test Title',
                date: '2016-08-18 13:03:12',
                content: 'Test Content',
                likeCount: 3,
                viewCount: 25,
                like: true
            },
            userData: {
                code: 0,
                name: 'Admin',
                profile: 'user/0/profile.jpg',
                job: 'Developer',
                country: 'South Korea',
                city: 'Seoul'
            }
        };

        vm.contents = vm.data.contents;
        vm.member = vm.data.userData;
        //DUMMY DATA

    }
})();
