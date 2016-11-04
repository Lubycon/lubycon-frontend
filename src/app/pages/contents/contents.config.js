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
                    getFilterData: function(Restangular) {
                        return Restangular.all('data').customGET('',{
                            contentSort: 'contentSort'
                        }).then();
                    }
                },
                authenticate: 'all'
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
                    getDummyContent: function($http, API_CONFIG) {
                        return $http.get(API_CONFIG.content + 'contents/threed/20160812214422_0/json/model.json').then();
                    },
                    getDummyMap: function($http, API_CONFIG) {
                        return $http.get(API_CONFIG.content + 'contents/threed/20160812214422_0/json/map.json').then();
                    },
                    getDummyLight: function($http, API_CONFIG) {
                        return $http.get(API_CONFIG.content + 'contents/threed/20160812214422_0/json/lights.json').then();
                    },
                    get3dMaps: function($http) {
                        return $http.get('/data/mapPreset/preset3d.json').then();
                    },
                    get2dMaps: function($http) {
                        return $http.get('/data/mapPreset/preset2d.json').then();
                    }
                },
                authenticate: 'all'
            });
    }
})();
