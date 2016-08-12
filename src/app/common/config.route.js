(function() {
    'use strict';

    angular
        .module('common')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider
            .state('common', {
                abstract: true,
                templateUrl: 'app/common/layouts/default/default.layout.html',
                controller: 'DefaultLayoutController',
                controllerAs: 'layout',
                resolve: {

                }
            })
            .state('common.default', {
                abstract: true,
                views: {
                    header: {
                        templateUrl: 'app/components/header/header.tmpl.html',
                        controller: 'HeaderController',
                        controllerAs: 'vm'
                    },
                    content: {
                        template: '<div ui-view></div>'
                    },
                    footer: {
                        templateUrl: 'app/components/footer/footer.tmpl.html',
                        controller: 'FooterController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('common.noFooter', {
                abstract: true,
                views: {
                    header: {
                        templateUrl: 'app/components/header/header.tmpl.html',
                        controller: 'HeaderController',
                        controllerAs: 'vm'
                    },
                    content: {
                        template: '<div ui-view></div>'
                    }
                }
            })
            .state('full.default', {
                abstract: true,
                views: {
                    content: {
                        template: '<div ui-view></div>'
                    }
                }
            })
            // aside default, aside noFooter 추가할 것 2016.08.12 - Evan
            ;
    }
})();
