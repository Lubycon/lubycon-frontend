(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('AccountSettingController', AccountSettingController);

    /** @ngInject */
    function AccountSettingController($rootScope, $scope, $state, Restangular, API_CONFIG) {
        var vm = this;
        vm.contentHost = API_CONFIG.content;
        vm.data = {
            userData: {
                code: 0,
                name: 'Admin',
                job: 'Developer',
                profile: 'user/0/profile.jpg',
                email: 'admin@lubycon.com',
                mobile: '+82-10-4755-6185',
                fax: "",
                website: 'aws.lubycon.com',
                country: 'South Korea',
                city: 'Seoul',
                position: 'Lubycon co.',
                description: 'Test Description'
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
            publicOption: {
                email: 'public',
                mobile: 'public',
                fax: 'public',
                website: 'public'
            }
        };
        vm.member = vm.data.userData;
        vm.languages = vm.data.language;
        vm.histories = vm.data.history;

        vm.publicOption = vm.data.publicOption;

        vm.publicOptionList = ['Public','Private'];
        vm.profileChanged = false;

        vm.init = (init)();
        function init(){

        }

        vm.changedFile = function(files,file,newFiles,invalidFiles){
            console.log("files : ", files);
            console.log("file : ", file);
            console.log("newFiles : ", newFiles);
            console.log("invalidFiles : ", invalidFiles);
            console.log(vm.uploadedProfile);

            console.log($.fn);

        }
        vm.crop = function(){
            var canvas = angular.element('.cropper').cropper("getCroppedCanvas", { width: 100, height: 100 }),
                base64URI = canvas.toDataURL('image/jpeg');
                console.log(base64URI);
            vm.profileChanged = true;
            vm.member.profile = base64URI;
        }

        vm.postSetting = function(){
            console.log(vm.data);
        }
    }
})();
