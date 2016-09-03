(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('AccountSettingController', AccountSettingController);

    /** @ngInject */
    function AccountSettingController($rootScope, $scope, $state, Restangular, API_CONFIG, $filter) {
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
                fax: "+82-2-6091-9776",
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
                    month: 'May',
                    category: 'Work',
                    content: 'Lubycon is started'
                },
                {
                    year: 2017,
                    month: 'Jan',
                    category: 'Work',
                    content: 'Work test data'
                },
                {
                    year: 2018,
                    month: 'Feb',
                    category: 'Education',
                    content: 'Education test data'
                },
                {
                    year: 2018,
                    month: 'Jul',
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

        // option dummy
        vm.publicOptionList = ['Public','Private'];
        vm.historyKind = ['Work Experience','Education','Awards'];
        vm.yearsDummy = [];
        vm.monthDummy = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        for(var i = 1950; i < new Date().getFullYear() * 1; i++){
            vm.yearsDummy.push(i);
            // console.log(vm.yearsDummy);
        }
        // option dummy

        vm.profileChanged = false;
        vm.cropping = false;

        vm.init = (init)();
        function init(){

        }

        vm.changedFile = function(files,file,newFiles,invalidFiles){
            console.log("files : ", files);
            console.log("file : ", file);
            console.log("newFiles : ", newFiles);
            console.log("invalidFiles : ", invalidFiles);
            console.log(vm.uploadedProfile);
        };
        vm.crop = function(){
            vm.cropping = false;
            var canvas = angular.element('.cropper').cropper('getCroppedCanvas', { width: 640, height: 640 }),
                base64URI = canvas.toDataURL('image/jpeg');
            vm.profileChanged = true;
            vm.member.profile = base64URI;

            angular.element('.cropper').cropper('destroy');
        };

        vm.languageControl = function(param){
            if(param === 'add'){
                if(vm.languages.length < 4){
                    var newLanguage = {
                        name: '',
                        level: 'Beginner'
                    };
                    vm.languages.push(newLanguage);
                }
                else alert('Too many Languages!!!');
            }
            else if(param === 'remove'){
                vm.languages.pop();
            }
        };

        vm.historyControl = function(param){
            if(param === 'add'){
                if(vm.histories.length < 20){
                    var now = new Date();
                    var newHistory = {
                        year: now.getFullYear(),
                        month: $filter('date')(now, 'MMM'),
                        category: 'Work',
                        content: ''
                    };
                    vm.histories.push(newHistory);
                }
                else alert('Too many Histories!!!');
            }
            else if(param === 'remove'){
                vm.histories.pop();
            }
        };

        vm.postSetting = function(){
            console.log(vm.data);
        };
    }
})();
