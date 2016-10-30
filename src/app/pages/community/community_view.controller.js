(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .controller('CommunityViewController', [
            '$rootScope', '$scope', '$sce', 'toastr', 'API_CONFIG', 'getPostRsv',
            '$state', '$stateParams',
            CommunityViewController
        ]);

    /** @ngInject */
    function CommunityViewController(
        $rootScope, $scope, $sce, toastr, API_CONFIG, getPostRsv,
        $state, $stateParams
    ) {
        var vm = this;
        vm.contentHost = API_CONFIG.content;
        //DUMMY DATA
        vm.data = getPostRsv.result;
        console.log(vm.data);

        //DUMMY DATA

        vm.init = (init)();

        function init(){
            vm.contents = vm.data.contents;
            vm.member = vm.data.userData;

            vm.counts = [
                { icon: 'fa fa-eye', data: vm.contents.viewCount },
                // { icon: 'fa fa-cloud-download', data: vm.contents.downloadCount },
                { icon: 'fa fa-heart', data: vm.contents.likeCount }
            ];

            vm.convertToHTML = convertToHTML;
        }

        function convertToHTML(string){
            return $sce.trustAsHtml(string);
        }

        vm.modify = goModify;
        function goModify() {
            $state.go('common.noFooter.community-write',{
                category: $stateParams.category,
                postId: $stateParams.postId
            });
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
            //     .customPOST(params).then(function(res){
            //
            //     });
        }


    }
})();
