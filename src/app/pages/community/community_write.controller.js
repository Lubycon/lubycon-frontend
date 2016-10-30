(function() {
    'use strict';

    angular
    .module('app.pages.community')
    .controller('CommunityWriteController', [
        '$rootScope', '$scope', 'toastr', 'Restangular',
        '$state', '$stateParams', 'getPostRsv',
        CommunityWriteController
    ]);

    /** @ngInject */
    function CommunityWriteController(
        $rootScope, $scope, toastr, Restangular,
        $state, $stateParams, getPostRsv
    ) {
        var vm = this;
        var isModifyMode = getPostRsv ? true : false;

        vm.init = (init)();

        function init(){
            vm.summernoteConfig = {
                toolbar: [
                    ['edit',['undo','redo']],
                    ['headline', ['style']],
                    ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                    ['textsize', ['fontsize']],
                    ['fontclr', ['color']],
                    ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                    ['height', ['height']],
                    ['insert', ['link','picture','hr']]
                ]
            };
            vm.postId = isModifyMode ? getPostRsv.result.contents.id : null;
            vm.title = isModifyMode ? getPostRsv.result.contents.title : null;
            vm.content = isModifyMode ? getPostRsv.result.contents.content : null;
            vm.attachedFiles = [];

            console.log(getPostRsv);
        }

        vm.changedFile = function(files,file,newFiles,invalidFiles) {
            console.log(files,file,newFiles,invalidFiles);
        };

        vm.submit = function() {
            vm.data = {
                attachementFile: vm.attachedFiles,
                title: vm.title,
                content: vm.content
            };
            if(vm.postId) { // MODIFY DATA
                Restangular.all('post/'+$stateParams.category+'/'+vm.postId).customPUT(vm.data)
                .then(function(res){
                    $state.go('common.noFooter.contentMessage',{
                        success: true,
                        kind: 'posts',
                        id: vm.postId
                    });
                });
            }
            else { // POST NEW DATA
                Restangular.all('post/'+$stateParams.category).customPOST(vm.data)
                .then(function(res) {
                    if(res.status.code === '0000') {
                        $state.go('common.noFooter.contentMessage',{
                            success: true,
                            kind: 'posts',
                            id: vm.postId
                        });
                    }
                });
            }


            console.log(vm.data);
        };
    }
})();
