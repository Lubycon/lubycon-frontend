(function() {
    'use strict';

    angular
        .module('app.pages.creator')
        .controller('CreatorController', CreatorController);

    /** @ngInject */
    function CreatorController($rootScope,$scope) {
        var vm = this;

        // DUMMY DATA
        vm.members = [
            {
                best: true,
                code: 0,
                profile: "#",
                name: "Test Creator",
                job: "Developer",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "#"
                    },
                    {
                        id: 1,
                        img: "#"
                    },
                    {
                        id: 2,
                        img: "#"
                    }
                ]
            },
            {
                best: false,
                code: 125,
                profile: "#",
                name: "Test Creator2",
                job: "Designer",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "#"
                    },
                    {
                        id: 1,
                        img: "#"
                    },
                    {
                        id: 2,
                        img: "#"
                    }
                ]
            },{
                best: false,
                code: 215,
                profile: "#",
                name: "Test Creator3",
                job: "Student",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "#"
                    },
                    {
                        id: 1,
                        img: "#"
                    },
                    {
                        id: 2,
                        img: "#"
                    }
                ]
            },{
                best: false,
                code: 734,
                profile: "#",
                name: "Test Creator4",
                job: "Devloper",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "#"
                    },
                    {
                        id: 1,
                        img: "#"
                    },
                    {
                        id: 2,
                        img: "#"
                    }
                ]
            },{
                best: false,
                code: 1102,
                profile: "#",
                name: "Test Creator5",
                job: "Robot",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "#"
                    },
                    {
                        id: 1,
                        img: "#"
                    },
                    {
                        id: 2,
                        img: "#"
                    }
                ]
            },{
                best: true,
                code: 0,
                profile: "#",
                name: "Test Creator6",
                job: "Jazz Pianist",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "#"
                    },
                    {
                        id: 1,
                        img: "#"
                    },
                    {
                        id: 2,
                        img: "#"
                    }
                ]
            }
        ];
        // DUMMY DATA
        console.log(vm.members);
    }
})();
