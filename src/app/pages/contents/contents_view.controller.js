(function() {
    'use strict';

    angular
        .module('app.pages.contents')
        .controller('ContentsViewController', [
            '$rootScope', '$scope', '$state', '$stateParams', 'Restangular',
            '$sce', 'API_CONFIG', 'toastr', 'InfiniteScrollService', 'UserActionService',
            'getContentRsv', 'get3dMaps', 'get2dMaps',
            ContentsViewController
        ]);

    /** @ngInject */
    function ContentsViewController(
        $rootScope, $scope, $state, $stateParams, Restangular,
        $sce, API_CONFIG, toastr, InfiniteScrollService, UserActionService,
        getContentRsv, get3dMaps, get2dMaps
    ) {
        loadContent();

        var vm = this;
        var commentAPI = 'comments/' + $stateParams.category + '/' + $stateParams.id;

        vm.isMobile = $rootScope.deviceInfo.isMobile;
        vm.data = getContentRsv.result;
        vm.scrollDisabled = true;

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

            InfiniteScrollService.init();

            InfiniteScrollService.get(commentAPI).then(function(res) {
                bindCommentList(res.result.comments);
                vm.totalCount = res.result.totalCount;
                vm.scrollDisabled = false;
            });
        }

        vm.onScroll = onScroll;
        function onScroll() {
            vm.scrollDisabled = true;
            getCommentList();
        }

        function loadContent() {
            Restangular.all('contents/' + $stateParams.category + '/' + $stateParams.id + '/data')
            .customGET().then(function(res) {
                vm.contentData = res.result.contents['3d'];
                loadMapData();
            });
        }

        function loadMapData() {
            var mapData = vm.contentData.map;
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

        vm.convertToHTML = convertToHTML;
        function convertToHTML(string){
            return $sce.trustAsHtml(string);
        }

        // PRIVATE METHOD
        function getCommentList() {
            console.log(vm.commentList);
            // FULL ITEM EXCPETION
            if(vm.commentList.length >= vm.totalCount) return false;
            // FULL ITEM EXCEPTION

            InfiniteScrollService.get(commentAPI).then(function(res) {
                bindCommentList(res.result.comments);

                vm.scrollDisabled = false;
            });
            return false;
        }

        function bindCommentList(newList) {
            console.log(newList);
            if(!vm.commentList) vm.commentList = [];

            if(newList) vm.commentList = $.merge(vm.commentList, newList);
            console.log(vm.commentList);
        }
    }
})();
