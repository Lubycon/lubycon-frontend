(function() {
    'use strict';

    angular
        .module('app.pages.member')
        .controller('MemberAsideController', MemberAsideController);

    /** @ngInject */
    function MemberAsideController($rootScope, $scope, API_CONFIG) {

        var vm = this;
        vm.contentHost = API_CONFIG.content;

        // DUMMY DATA..나중에는 $rootScope에서 빼낼 것
        vm.member = {
            code: 0,
            name: 'Admin',
            profile: 'user/0/profile.jpg',
            job: 'Developer',
            country: 'South Korea',
            city: 'Seoul',
            email: 'admin@lubycon.com',
            position: 'Lubycon co.',
            description: 'This is Test description'
        };
        // DUMMY DATA
        vm.menu = [
            // DASHBOARD, INSIGHT, CONTENTS, FORUMS, BOOKMARK, (MESSAGE, FOLLOWING) <- personal
            {
                icon: 'fa fa-tachometer',
                name: 'Dashboard',
                private: false,
                link: 'aside.default.dashboard({memberId: vm.member.code})'
            },
            {
                icon: 'fa fa-bar-chart',
                name: 'Insight',
                private: false,
                link: 'aside.default.insight({memberId: vm.member.code})'
            },
            {
                icon: 'fa fa-archive',
                name: 'Contents',
                private: false,
                link: 'aside.default.memberContents({memberId: vm.member.code})'
            },
            {
                icon: 'fa fa-comments-o',
                name: 'Forums',
                private: false,
                link: 'aside.default.memberForums({memberId: vm.member.code})'
            },
            {
                icon: 'fa fa-star',
                name: 'Bookmark',
                private: true,
                link: 'aside.default.bookmark({memberId: vm.member.code})'
            },
            {
                icon: 'fa fa-envelope-o',
                name: 'Message',
                private: true,
                link: 'aside.default.message({memberId: vm.member.code})'
            },
            {
                icon: 'fa fa-users',
                name: 'Follow',
                private: true,
                link: 'aside.default.follow({memberId: vm.member.code})'
            },
        ];
    }
})();
