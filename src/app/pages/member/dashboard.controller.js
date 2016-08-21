(function() {
    'use strict';

    angular
        .module('app.pages.member')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController($rootScope,$scope,API_CONFIG) {
        var vm = this;
        vm.contentHost = API_CONFIG.content;
        vm.isMobile = $rootScope.deviceInfo.isMobile;

        // DUMMY DATA
        vm.data = {
            userData: {
                code: 0,
                name: 'Admin',
                job: 'Developer',
                profile: 'user/0/profile.jpg',
                email: 'admin@lubycon.com',
                website: 'aws.lubycon.com',
                country: 'South Korea',
                city: 'Seoul',
                position: 'Lubycon co.'
            },
            language: [
                {
                    name: 'Korean',
                    level: 'Native'
                },
                {
                    name: 'English',
                    level: 'Beginner'
                }
            ],
            history: [
                {
                    year: 2015,
                    month: 5,
                    category: 'Work',
                    content: 'Lubycon is started'
                },
                {
                    year: 2017,
                    month: 1,
                    category: 'Work',
                    content: 'Work test data'
                },
                {
                    year: 2018,
                    month: 2,
                    category: 'Education',
                    content: 'Education test data'
                },
                {
                    year: 2018,
                    month: 7,
                    category: 'Awards',
                    content: 'Award Test data'
                }
            ],
            insight: {
                likeTotal: 109,
                viewTotal: 1290,
                uploadTotal: 27,
                downloadTotal: 118,
                like7days: [
                    { date: '2016-08-21', value: 3},
                    { date: '2016-08-22', value: 18},
                    { date: '2016-08-23', value: 0},
                    { date: '2016-08-24', value: 1},
                    { date: '2016-08-25', value: 12},
                    { date: '2016-08-26', value: 7},
                ],
                view7days: [
                    { date: '2016-08-21', value: 3},
                    { date: '2016-08-22', value: 18},
                    { date: '2016-08-23', value: 0},
                    { date: '2016-08-24', value: 1},
                    { date: '2016-08-25', value: 12},
                    { date: '2016-08-26', value: 7},
                ],
                upload7days: [
                    { date: '2016-08-21', value: 3},
                    { date: '2016-08-22', value: 18},
                    { date: '2016-08-23', value: 0},
                    { date: '2016-08-24', value: 1},
                    { date: '2016-08-25', value: 12},
                    { date: '2016-08-26', value: 7},
                ],
                download7days: [
                    { date: '2016-08-21', value: 3},
                    { date: '2016-08-22', value: 18},
                    { date: '2016-08-23', value: 0},
                    { date: '2016-08-24', value: 1},
                    { date: '2016-08-25', value: 12},
                    { date: '2016-08-26', value: 7},
                ]
            },
            publicOption: {
                email: true,
                mobile: true,
                fax: true,
                website: true
            }
        };
        // DUMMY DATA

        vm.member = vm.data.userData;
        vm.language = vm.data.language;
        vm.history = vm.data.history;
        vm.insight = vm.data.insight;
        vm.publicOption = vm.data.publicOption;
    }
})();
