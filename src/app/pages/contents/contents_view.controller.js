(function() {
    'use strict';

    angular
        .module('app.pages.contents')
        .controller('ContentsViewController', ContentsViewController);

    /** @ngInject */
    function ContentsViewController(
        $rootScope, $scope, $state, $stateParams,
        $sce, API_CONFIG
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
                content: '<div style="font-weight: 600";>TEST CONTENT</div>',
                description: 'This is test description',
                bookmark: true,
                like: false,
                likeCount: 32,
                viewCount: 11,
                downloadCount: 3,
                filePath: 'http://aws.lubycon.com/contents/contents/2016081101_20',
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
        // DUMMY DATA
        vm.init = (init)();

        function init(){
            vm.contents = vm.data.contents;
            vm.category = $stateParams.category;
            vm.is3D = vm.category === '3d';

            vm.counts = [
                { icon: 'fa fa-eye', data: vm.contents.viewCount },
                { icon: 'fa fa-cloud-download', data: vm.contents.downloadCount },
                { icon: 'fa fa-heart', data: vm.contents.likeCount }
            ];
            vm.contents.subCate = vm.contents.subCate.split(',');

            vm.member = vm.data.userData;

            vm.convertToHTML = convertToHTML;
        }

        function convertToHTML(string){
            return $sce.trustAsHtml(string);
        }
    }
})();
