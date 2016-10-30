(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .controller('CommunityController', [
            '$rootScope','$scope',
            CommunityController
        ]);

    /** @ngInject */
    function CommunityController($rootScope,$scope) {
        var vm = this;
        //DUMMY DATA
        vm.lists = [
            {
                content:{
                    id: 1,
                    title: "Test Row",
                    comment: 17,
                    like: 21,
                    view: 16,
                    date: "2016-08-14"
                },
                userData:{
                    id: 0,
                    name: "Test Member",
                    profile: "user/3/profile.jpg"
                }
            },
            {
                content:{
                    id: 2,
                    title: "Test Row1",
                    comment: 22,
                    like: 6,
                    view: 52,
                    date: "2016-08-14"
                },
                userData:{
                    id: 1,
                    name: "Test Member1",
                    profile: "user/5/profile.jpg"
                }
            },
            {
                content:{
                    id: 3,
                    title: "Test Row2",
                    comment: 7,
                    like: 81,
                    view: 105,
                    date: "2016-08-14"
                },
                userData:{
                    id: 2,
                    name: "Test Member2",
                    profile: "user/0/profile.jpg"
                }
            }
        ];
        //DUMMY DATA

        // BIND FILTERS...
        vm.filterData = {
            sort: null
        };
        vm.filters = [{
            icon: 'fa-filter',
            options: ['Recent','Featured','Like','Download','Comment'],
            data: vm.filterData.sort
        }];
        vm.filterSubmit = function() {
            vm.filterData.sort = vm.filters[0].data;
            console.log(vm.filterData);
        };
    }
})();
