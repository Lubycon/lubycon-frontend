(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, toastr, toastrConfig, API_CONFIG) {
        console.log("MAIN PAGE IS LOADED");

        var vm = this;
        vm.contentHost = API_CONFIG.content;
        vm.data = {
            contents: [
                {
                    title: 'Content Title',
                    creator: 'Andrew Shanks',
                    img: 'contents/threed/Andrew_Shanks20160414050808/thumbnail/thumbnail.jpg'
                },
                {
                    title: 'Content Title1',
                    creator: 'Caroline Davies',
                    img: 'contents/threed/Caroline_Davies20160414050808/thumbnail/thumbnail.jpg'
                },
                {
                    title: 'Content Title2',
                    creator: 'Christine Brett',
                    img: 'contents/threed/Christine_Brett20160414050808/thumbnail/thumbnail.jpg'
                },
                {
                    title: 'Content Title3',
                    creator: 'Gwyn Collins',
                    img: 'contents/threed/Gwyn_Collins20160414050808/thumbnail/thumbnail.jpg'
                }
            ],
            bestCreator: {
                profile: 'user/12/profile.jpg',
                name: 'Mohammad Anwar',
                job: 'Developer',
                country: 'United State America',
                city: 'New York',
                contentImg: 'contents/threed/Mohammad_Anwar20160414050808/thumbnail/thumbnail.jpg',
                contentTitle: 'Best Content Title'
            }
        }

        vm.init = init();

        function init(){
            console.log("init");
        }

    }
})();
