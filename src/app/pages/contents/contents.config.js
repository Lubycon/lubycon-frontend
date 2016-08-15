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
            });
    }
})();
