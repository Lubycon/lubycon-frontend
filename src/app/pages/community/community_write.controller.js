(function() {
    'use strict';

    angular
    .module('app.pages.community')
    .controller('CommunityWriteController', [
        '$rootScope', '$scope', 'toastr', 'Restangular', '$state', '$stateParams',
        CommunityWriteController
    ]);

    /** @ngInject */
    function CommunityWriteController(
        $rootScope, $scope, toastr, Restangular, $state, $stateParams
    ) {
        var vm = this;

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
            vm.postId = $stateParams.postId;

            vm.attachedFiles = [];
            vm.title = null;
            vm.content = null;
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
                Restangular.all('post/'+$stateParams.category+'/'+vm.postId).customPUT(vm.data).then(function(){
                    console.log(res);
                });
            }
            else { // POST NEW DATA
                Restangular.all('post/'+$stateParams.category).customPOST(vm.data).then(function(res) {
                    console.log(res);
                });
            }


            console.log(vm.data);
        };
    }
})();
