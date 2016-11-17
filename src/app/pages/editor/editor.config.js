(function() {
    'use strict';

    angular
        .module('app.pages.editor')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('common.noFooter.editor3d', {
                url: '/editor/3d',
                templateUrl: 'app/pages/editor/editor.tmpl.html',
                controller: 'Editor3dController',
                controllerAs: 'vm',
                resolve: {
                    get3dMaps: function($http) {
                        return $http.get('/data/mapPreset/preset3d.json').then();
                    },
                    get2dMaps: function($http) {
                        return $http.get('/data/mapPreset/preset2d.json').then();
                    },
                    getCategory: function($http) {
                        return $http.get('/data/category.json').then();
                    },
                    getCreativeCommons: function($http) {
                        return $http.get('/data/creative_commons.json').then();
                    }
                },
                authenticate: 'active'
            })
            ;
    }
})();
