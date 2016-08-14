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
                profile: "user/0/profile.jpg",
                name: "Test Creator",
                job: "Developer",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 1,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 2,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    }
                ]
            },
            {
                best: false,
                code: 100,
                profile: "user/100/profile.jpg",
                name: "Test Creator2",
                job: "Designer",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 1,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 2,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    }
                ]
            },{
                best: false,
                code: 11,
                profile: "user/11/profile.jpg",
                name: "Test Creator3",
                job: "Student",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 1,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 2,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    }
                ]
            },{
                best: false,
                code: 2,
                profile: "user/2/profile.jpg",
                name: "Test Creator4",
                job: "Devloper",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 1,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 2,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    }
                ]
            },{
                best: false,
                code: 102,
                profile: "user/102/profile.jpg",
                name: "Test Creator5",
                job: "Robot",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 1,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 2,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    }
                ]
            },{
                best: true,
                code: 5,
                profile: "user/5/profile.jpg",
                name: "Test Creator6",
                job: "Jazz Pianist",
                countryCode: "200",
                country: "South Korea",
                city: "Seoul",
                contents: [
                    {
                        id: 0,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 1,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    },
                    {
                        id: 2,
                        img: "contents/threed/Audrey_Wickham20160414050808/thumbnail/thumbnail.jpg"
                    }
                ]
            }
        ];
        // DUMMY DATA
    }
})();
