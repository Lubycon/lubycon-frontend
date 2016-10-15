(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .controller('CommunityViewController', [
            '$rootScope', '$scope', '$sce', 'toastr', 'API_CONFIG',
            CommunityViewController
        ]);

    /** @ngInject */
    function CommunityViewController($rootScope, $scope, $sce, toastr, API_CONFIG) {
        var vm = this;
        vm.contentHost = API_CONFIG.content;
        //DUMMY DATA
        vm.data = {
            contents: {
                code: 0,
                title: 'Test Title',
                date: '2016-08-18 13:03:12',
                content: '<b>Quis habitasse in urna</b>, ac sagittis scelerisque sociis, elementum sociis pid pulvinar facilisis integer magnis dapibus! Enim enim pulvinar hac urna pulvinar placerat dictumst risus dolor, lacus aenean magna auctor vut, mauris! Ac ac augue mattis? Tempor phasellus, elementum tincidunt dapibus et ultrices adipiscing natoque cursus et, enim. Natoque amet cras enim, a porta, amet integer. Nunc aenean, odio magnis! Sagittis duis sociis. Proin, rhoncus tincidunt, tincidunt integer, pellentesque rhoncus elit dignissim non sit tincidunt elementum, turpis nec vel, ut, nec odio tristique ultrices nunc. Turpis aenean dolor vel mid! Parturient, egestas massa rhoncus aliquet, dapibus. Rhoncus a placerat, odio? Platea sit! Dignissim urna amet et augue amet risus risus, augue, et pellentesque, mauris? Sed porttitor, elit porta odio sagittis.',
                likeCount: 3,
                viewCount: 25,
                like: true
            },
            userData: {
                code: 0,
                name: 'Admin',
                profile: 'user/0/profile.jpg',
                job: 'Developer',
                country: 'South Korea',
                city: 'Seoul'
            }
        };

        vm.comments = [
            {
                userCode: 5,
                code: 1,
                name: 'Test member1',
                profile: 'user/5/profile.jpg',
                date: '2016-08-17 12:32:01',
                content: 'Habitasse aliquet. Enim amet adipiscing quis. Elementum? Nec et augue purus ac mauris, est facilisis. Massa, porttitor scelerisque sed dolor, proin nisi, elit ultricies! Pulvinar tristique, mauris phasellus amet duis sed non dictumst habitasse integer lundium! Urna ac? Sagittis? '
            },
            {
                userCode: 5,
                code: 1,
                name: 'Test member1',
                profile: 'user/5/profile.jpg',
                date: '2016-08-17 12:32:01',
                content: 'Habitasse aliquet. Enim amet adipiscing quis. Elementum? Nec et augue purus ac mauris, est facilisis. Massa, porttitor scelerisque sed dolor, proin nisi, elit ultricies! Pulvinar tristique, mauris phasellus amet duis sed non dictumst habitasse integer lundium! Urna ac? Sagittis? '
            }
        ];
        //DUMMY DATA

        vm.init = (init)();

        function init(){
            vm.contents = vm.data.contents;
            vm.member = vm.data.userData;

            vm.counts = [
                { icon: 'fa fa-eye', data: vm.contents.viewCount },
                { icon: 'fa fa-cloud-download', data: vm.contents.downloadCount },
                { icon: 'fa fa-heart', data: vm.contents.likeCount }
            ];

            vm.convertToHTML = convertToHTML;
        }

        function convertToHTML(string){
            return $sce.trustAsHtml(string);
        }

        vm.likeAction = likeAction;
        function likeAction(){
            // BOOKMARK CHECKING...
            if(vm.contents.like) { // OFF
                vm.contents.like = false;
            }
            else if(!vm.contents.like) { // ON
                vm.contents.like = true;
                toastr.success('Thanks!! - ' + vm.member.name + ' -',{
                    iconClass: 'toast-like'
                });
            }
            else return false;
            // BOOKMARK CHECKING END
            // CREATE POST PARAM
            var params = {
                checked: vm.contents.like,
                getUserCode: vm.member.code
                //giveUserCode: $rootScope.member.code // 미구현
            };

            console.log(params);

            // POST TO SERVER...
            // Restangular.all('like/community/' + $stateParams.category + vm.contents.code)
            //     .customPOST(params, undefined, undefined, {'Content-Type':'application/json'})
            //     .then(function(res){
            //
            //     });
        }


    }
})();
