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
                params: {
                    category: null
                },
                resolve: {
                    // getCreatorRsv: function($stateParams, Restangular) {
                    //     var api = Restangular.all('cretors');
                    //     return api.customGET().then();
                    // }
                }
            })
            // .state('common.noFooter.editor2d', {
            //     url: '/editor/2d',
            //     templateUrl: 'app/pages/editor/editor.tmpl.html',
            //     controller: 'Editor2dController',
            //     controllerAs: 'vm',
            //     params: {
            //         category: null
            //     },
            //     resolve: {
            //         // getCreatorRsv: function($stateParams, Restangular) {
            //         //     var api = Restangular.all('cretors');
            //         //     return api.customGET().then();
            //         // }
            //     }
            // })
            ;
    }
})();