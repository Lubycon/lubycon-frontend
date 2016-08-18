(function() {
    'use strict';

    angular
        .module('app.pages.contents')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.figure.contents', {
                url: '/contents/:category',
                templateUrl: 'app/pages/contents/contents.tmpl.html',
                controller: 'ContentsController',
                controllerAs: 'vm',
                params: {
                    category: null
                },
                resolve: {
                    // getContentRsv: function($stateParams, Restangular) {
                    //     var api = Restangular.all('contents/'+ $stateParams.category);
                    //     return api.customGET().then();
                    // }
                }
            })
            .state('common.default.contents-view', {
                url: '/contents/:category/:boardId',
                templateUrl: 'app/pages/contents/contents_view.tmpl.html',
                controller: 'ContentsViewController',
                controllerAs: 'vm',
                params: {
                    category: null,
                    boardId: null
                },
                resolve: {
                    // getContentRsv: function($stateParams, Restangular) {
                    //     var api = Restangular.all('contents/' + $stateParams.category + '/' + $stateParams.boardId);
                    //     return api.customeGET().then()
                    // }
                }
            });
    }
})();
