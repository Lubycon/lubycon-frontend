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
                    getFilterData: function(Restangular) {
                        return Restangular.all('data').customGET('',{
                            data: 'contentSort'
                        }).then();
                    }
                },
                authenticate: 'all'
            })
            .state('common.default.contents-view', {
                url: '/contents/:category/:id',
                templateUrl: 'app/pages/contents/contents_view.tmpl.html',
                controller: 'ContentsViewController',
                controllerAs: 'vm',
                params: {
                    category: null,
                    id: null
                },
                resolve: {
                    getContentRsv: function($stateParams, Restangular) {
                        var api = Restangular.all('contents/' + $stateParams.category + '/' + $stateParams.id);
                        return api.customGET().then();
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
