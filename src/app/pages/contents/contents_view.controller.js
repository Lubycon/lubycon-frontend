(function() {
    'use strict';

    angular
        .module('app.pages.contents')
        .controller('ContentsViewController', [
            '$rootScope', '$scope', '$state', '$stateParams',
            '$sce', 'API_CONFIG', 'toastr',
            'getContentRsv', 'get3dMaps', 'get2dMaps',
            ContentsViewController
        ]);

    /** @ngInject */
    function ContentsViewController(
        $rootScope, $scope, $state, $stateParams,
        $sce, API_CONFIG, toastr,
        getContentRsv, get3dMaps, get2dMaps
    ) {

        var vm = this;
        console.log($state);

        // DUMMY DATA
        vm.data = getContentRsv.result;

        vm.init = (init)();
        function init(){
            vm.viewerType = $stateParams.category;
            if(vm.viewerType === '3d') {
                vm.scene = new THREE.Scene();
                vm.renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true });
            }

            vm.contents = vm.data.contents;
            vm.member = vm.data.userData;

            vm.mapObject = {};

            vm.category = $stateParams.category;
            vm.is3D = vm.category === '3d';

            vm.counts = [
                { icon: 'fa fa-eye', data: vm.contents.viewCount },
                { icon: 'fa fa-cloud-download', data: vm.contents.downloadCount },
                { icon: 'fa fa-heart', data: vm.contents.likeCount }
            ];

            vm.downloadable = vm.contents.filePath !== null;

            vm.convertToHTML = convertToHTML;

            // loadMapData(); s3 활성화 전까지는 잠시 꺼놓음
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
