(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .controller('CommunityViewController', [
            '$rootScope', '$scope', '$sce', 'toastr', 'API_CONFIG', 'getPostRsv',
            '$state', '$stateParams', 'UserActionService', 'InfiniteScrollService',
            CommunityViewController
        ]);

    /** @ngInject */
    function CommunityViewController(
        $rootScope, $scope, $sce, toastr, API_CONFIG, getPostRsv,
        $state, $stateParams, UserActionService, InfiniteScrollService
    ) {
        var vm = this;
        var commentAPI = 'comments/' + $stateParams.category + '/' + $stateParams.id;

        vm.isMobile = $rootScope.deviceInfo.isMobile;
        vm.data = getPostRsv.result;
        vm.scrollDisabled = true;

        vm.init = (init)();
        function init(){
            vm.contents = vm.data.contents;
            vm.member = vm.data.userData;

            vm.counts = [
                { icon: 'fa fa-eye', data: vm.contents.viewCount },
                { icon: 'fa fa-heart', data: vm.contents.likeCount }
            ];

            InfiniteScrollService.init();

            InfiniteScrollService.get(commentAPI).then(function(res) {
                bindCommentList(res.result.comments);
                vm.totalCount = res.result.totalCount;
                vm.scrollDisabled = false;
            });
        }

        vm.convertToHTML = convertToHTML;
        function convertToHTML(string){
            return $sce.trustAsHtml(string);
        }

        vm.modify = goModify;
        function goModify() {
            $state.go('common.noFooter.community-write',{
                category: $stateParams.category,
                id: $stateParams.id
            });
        }

        vm.onScroll = onScroll;
        function onScroll() {
            vm.scrollDisabled = true;
            getCommentList();
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
