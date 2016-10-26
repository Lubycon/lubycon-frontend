(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.figure.community', {
                url: '/community/:category',
                templateUrl: 'app/pages/community/community.tmpl.html',
                controller: 'CommunityController',
                controllerAs: 'vm',
                params: {
                    category: null
                },
                resolve: {
                    // getCommunityRsv: function($stateParams, Restangular) {
                    //     var api = Restangular.all('community/'+ $stateParams.category);
                    //     return api.customGET().then();
                    // }
                }
            })
            .state('common.default.community-view', {
                url: '/community/:category/view/:boardId',
                templateUrl: 'app/pages/community/community_view.tmpl.html',
                controller: 'CommunityViewController',
                controllerAs: 'vm',
                params: {
                    category: null,
                    boardId: null
                },
                resolve: {
                    // getBoardRsv: function($stateParams, Restangular) {
                    //     var api = Restangular.all('community/' + $stateParams.category + '/' + $stateParams.boardId);
                    //     return api.customGET().then();
                    // }
                }
            })
            .state('common.noFooter.community-write', {
                url: '/community/:category/write?:postId',
                templateUrl: 'app/pages/community/community_write.tmpl.html',
                controller: 'CommunityWriteController',
                controllerAs: 'vm',
                params: {
                    category: null,
                    postId: null
                },
                resolve: {
                    // getContent: function($stateParams, Restangular) {
                    //     var api = Restangular.all('community/' + $stateParams.category + '/' + $stateParams.boardId);
                    //     return api.customGET().then();
                    // }
                },
                authenticate: 'member'
            })
            ;
    }
})();
