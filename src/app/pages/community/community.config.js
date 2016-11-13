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
                    getCommunityRsv: function($stateParams, Restangular) {
                        var api = Restangular.all('posts/'+ $stateParams.category);
                        return api.customGET().then();
                    },
                    getFilterData: function(Restangular) {
                        return Restangular.all('data').customGET('',{
                            data: 'postSort'
                        }).then();
                    }
                },
                authenticate: 'all'
            })
            .state('common.default.community-view', {
                url: '/community/:category/:id',
                templateUrl: 'app/pages/community/community_view.tmpl.html',
                controller: 'CommunityViewController',
                controllerAs: 'vm',
                params: {
                    category: null,
                    id: null
                },
                resolve: {
                    getPostRsv: function($stateParams, Restangular) {
                        var api = Restangular.all('posts/' + $stateParams.category + '/' + $stateParams.id);
                        return api.customGET().then();
                    }
                },
                authenticate: 'all'
            })
            .state('common.noFooter.community-write', {
                url: '/community/:category/write?:id',
                templateUrl: 'app/pages/community/community_write.tmpl.html',
                controller: 'CommunityWriteController',
                controllerAs: 'vm',
                params: {
                    category: null,
                    id: null
                },
                resolve: {
                    getPostRsv: function($stateParams, Restangular) {
                        if($stateParams.id) {
                            var api = Restangular.all('posts/' + $stateParams.category + '/' + $stateParams.id);
                            return api.customGET().then();
                        }
                        else return null;
                    }
                },
                authenticate: 'active'
            })
            ;
    }
})();
