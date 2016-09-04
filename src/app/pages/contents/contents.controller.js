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
                title: "The AR Machine",
                category: "3D",
                image: "contents/threed/Adrian_Joy20160414050808/thumbnail/thumbnail.jpg",
                license: "Free",
                bookmark: true,
                userData: {
                    code: 1,
                    name: "Adrian Joy",
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
                title: "Prison",
                category: "3D",
                image: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg",
                license: "Free",
                bookmark: false,
                userData: {
                    code: 1,
                    name: "Audrey Wickham",
                    profile: "user/15/profile.jpg"
                },
                contentCount: {
                    view: 15,
                    comment: 23,
                    like: 12
                }
            },
            {
                code : 3,
                title: "Sweeeety Apples",
                category: "3D",
                image: "contents/threed/Robert_Beasley20160414050808/thumbnail/thumbnail.jpg",
                license: "Free",
                bookmark: true,
                userData: {
                    code: 1,
                    name: "Robert Beasley",
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
                title: "Mirror",
                category: "3D",
                image: "contents/threed/Steven_Watkins20160414050808/thumbnail/thumbnail.jpg",
                license: "Free",
                bookmark: false,
                userData: {
                    code: 2,
                    name: "Steven Watkins",
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
                title: "Blue Chairs",
                category: "3D",
                image: "contents/threed/Terence_Bingham20160414050808/thumbnail/thumbnail.jpg",
                license: "Free",
                bookmark: true,
                userData: {
                    code: 5,
                    name: "Terence Bingham",
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

        // BIND FILTERS...
        vm.filterData = {
            category: null,
            license: null,
            sort: null
        };
        vm.filters = [
            {
                icon: 'fa-bars',
                options: ['All Category','category1','category2','category3'],
                data: vm.filterData.category
            },
            {
                icon: 'fa-creative-commons',
                options: ['All license','Free','Non commercial'],
                data: vm.filterData.license
            },
            {
                icon: 'fa-filter',
                options: ['Recent','Featured','Downalod','View'],
                data: vm.filterData.sort
            }
        ];
        vm.filterSubmit = function() {
            vm.filterData.category = vm.filters[0].data;
            vm.filterData.license = vm.filters[1].data;
            vm.filterData.sort = vm.filters[2].data;
            console.log(vm.filterData);
        };
    }
})();
