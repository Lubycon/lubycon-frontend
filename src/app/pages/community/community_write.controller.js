(function() {
    'use strict';

    angular
    .module('app.pages.community')
    .controller('CommunityWriteController', [
        '$rootScope', '$scope', 'toastr',
        CommunityWriteController
    ]);

    /** @ngInject */
    function CommunityWriteController($rootScope, $scope, toastr) {
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
                    ['table', ['table']],
                    ['insert', ['link','picture','hr']]
                ]
            };
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
            console.log(vm.data);
        };
    }
})();
