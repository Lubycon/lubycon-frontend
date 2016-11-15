(function() {
    'use strict';

    angular
        .module('app.pages.account')
        .controller('AccountSettingController', [
            '$rootScope', '$scope', '$state',
            '$stateParams', 'Restangular',
            'API_CONFIG', '$filter',
            'getMember','getData', AccountSettingController
        ]);

    /** @ngInject */
    function AccountSettingController(
        $rootScope, $scope, $state, $stateParams,
        Restangular, API_CONFIG, $filter,
        getMember, getData
    ) {

        console.log(getMember.result);

        var vm = this;
        vm.contentHost = API_CONFIG.content;
        vm.data = getMember.result;

        vm.member = vm.data.userData;
        vm.languages = vm.data.language;
        vm.histories = vm.data.history;

        vm.publicOption = vm.data.publicOption;

        vm.publicOptionList = ['Public','Private'];
        vm.languageLevelList = ['Beginner','Advanced','Fluent'];

        console.log(getData);
        vm.countryList = getData.result.country;
        vm.jobList = getData.result.job;

        vm.historyKind = ['Work Experience','Education','Awards'];
        vm.yearList = [];
        vm.monthList = [];

        for(var year = 1950; year <= new Date().getFullYear() * 1; year++){
            vm.yearList.push(year);
        }
        vm.yearList.reverse();

        for(var month = 1; month < 13; month++){
            vm.monthList.push(month);
        }

        vm.profileChanged = false;
        vm.cropping = false;

        vm.init = (init)();

        function init() {
            vm.histories = vm.histories.map(function(v) {
                v.date = encodeDate(v.date);
                return v;
            });
        }

        function encodeDate(date) {
            date = new Date(date);
            date = {
                year: date.getFullYear(),
                month: date.getMonth() + 1
            };
            console.log(date);
            return date;
        }
        function decodeDate(date) {
            date = new Date(date.year,date.month - 1);
            return date;
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
                        date: {
                            year: now.getFullYear(),
                            month: now.getMonth() + 1
                        },
                        category: 'Work Experience',
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

        vm.submit = function(){
            vm.histories = vm.histories.map(function(v) {
                v.date = decodeDate(v.date);
                return v;
            }).sort(function(a,b){
                return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
            });

            vm.data.history = vm.histories;

            console.log(vm.data.history);
            console.log(vm.data);

            Restangular.all('members/detail/' + $stateParams.memberId).customPOST(vm.data).then(function(res) {
                console.log(res);
            });
        };
    }
})();
