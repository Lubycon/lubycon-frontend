(function() {
    'use strict';

    angular
        .module('app.pages.contents')
        .controller('ContentsViewController', [
            '$rootScope', '$scope', '$state', '$stateParams',
            '$sce', 'API_CONFIG', 'toastr',
            'getDummyContent', 'getDummyMap', 'getDummyLight', 'get3dMaps', 'get2dMaps',
            ContentsViewController
        ]);

    /** @ngInject */
    function ContentsViewController(
        $rootScope, $scope, $state, $stateParams,
        $sce, API_CONFIG, toastr,
        getDummyContent, getDummyMap, getDummyLight, get3dMaps, get2dMaps
    ) {

        var vm = this;
        console.log($state);

        // DUMMY DATA
        vm.contentHost = API_CONFIG.content;
        vm.data = {
            contents: {
                code: $state.params.boardId,
                title: 'Test Title',
                subCate: 'category1, category2',
                content: {
                    model: getDummyContent.data,
                    map: getDummyMap.data,
                    lights: getDummyLight.data
                },
                description: 'This is test description',
                bookmark: true,
                like: false,
                likeCount: 32,
                viewCount: 11,
                downloadCount: 3,
                // filePath: 'http://aws.lubycon.com/contents/contents/2016081101_20',
                cc: '0101',
                tags: ['tag1','tag2','tag3','tag4','tag5']
            },
            userData: {
                code: 0,
                name: 'Admin',
                job: 'Developer',
                profile: 'user/0/profile.jpg',
                country: 'South Korea',
                city: 'Seoul'
            }
        };
        vm.comments = [{
            userCode: 5,
            code: 1,
            name: 'Test member1',
            profile: 'user/5/profile.jpg',
            date: '2016-08-17 12:32:01',
            content: 'Habitasse aliquet. Enim amet adipiscing quis. Elementum? Nec et augue purus ac mauris, est facilisis. Massa, porttitor scelerisque sed dolor, proin nisi, elit ultricies! Pulvinar tristique, mauris phasellus amet duis sed non dictumst habitasse integer lundium! Urna ac? Sagittis? '
        },{
            userCode: 5,
            code: 1,
            name: 'Test member1',
            profile: 'user/5/profile.jpg',
            date: '2016-08-17 12:32:01',
            content: 'Habitasse aliquet. Enim amet adipiscing quis. Elementum? Nec et augue purus ac mauris, est facilisis. Massa, porttitor scelerisque sed dolor, proin nisi, elit ultricies! Pulvinar tristique, mauris phasellus amet duis sed non dictumst habitasse integer lundium! Urna ac? Sagittis? '
        }];
        // DUMMY DATA

        vm.init = (init)();
        vm.viewerType = $stateParams.category;
        if(vm.viewerType === '3d') {
            vm.scene = new THREE.Scene();
            vm.renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true });
        }

        function init(){
            vm.contents = vm.data.contents;
            vm.mapObject = {};

            vm.category = $stateParams.category;
            vm.is3D = vm.category === '3d';

            vm.counts = [
                { icon: 'fa fa-eye', data: vm.contents.viewCount },
                { icon: 'fa fa-cloud-download', data: vm.contents.downloadCount },
                { icon: 'fa fa-heart', data: vm.contents.likeCount }
            ];
            vm.contents.subCate = vm.contents.subCate.split(',');

            vm.downloadable = vm.contents.filePath !== undefined;

            vm.member = vm.data.userData;

            vm.convertToHTML = convertToHTML;

            loadMapData();
        }

        function loadMapData() {
            var mapData = vm.contents.content.map;
            var map;
            console.log(mapData);
            if(mapData.type === '3d') {
                vm.mapObject = get3dMaps.data[mapData.index];
            }
            else {
                vm.mapObject = get2dMaps.data[mapData.index];
                vm.mapObject.color = mapData.color;
            }
        }

        function convertToHTML(string){
            return $sce.trustAsHtml(string);
        }

        vm.bookmarkAction = bookmarkAction;
        function bookmarkAction(){
            // BOOKMARK CHECKING...
            if(vm.contents.bookmark) { // OFF
                vm.contents.bookmark = false;
                toastr.success(vm.contents.title+' is removed at your bookmark',{
                    iconClass: 'toast-remove'
                });
            }
            else if(!vm.contents.bookmark) { // ON
                vm.contents.bookmark = true;
                toastr.success(vm.contents.title+' is saved to your bookmark',{
                    iconClass: 'toast-bookmark'
                });
            }
            else return false;
            // BOOKMARK CHECKING END
            // CREATE POST PARAM
            var params = {
                checked: vm.contents.bookmark,
                getUserCode: vm.member.code
                //giveUserCode: $rootScope.member.code // 미구현
            };

            console.log(params);

            // POST TO SERVER...
            // Restangular.all('bookmark/contents/' + $stateParams.category + vm.contents.code)
            //     .customPOST(params).then(function(res){
            //
            //     });
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
            // Restangular.all('like/contents/' + $stateParams.category + vm.contents.code)
            //     .customPOST(params).then(function(res){
            //
            //     });
        }
    }
})();
