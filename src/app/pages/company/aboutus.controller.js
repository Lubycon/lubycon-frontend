(function() {
    'use strict';

    angular
        .module('app.pages.company')
        .controller('AboutUsController', AboutUsController);

    /** @ngInject */
    function AboutUsController($rootScope,$scope) {
        var vm = this;

        vm.focuses = [
            {
                icon: 'design.png',
                title: 'DESIGN',
                description: 'All unique individuals are naturally born with the joy for creative process. Show us your creation and tell us about your creative mind'
            },
            {
                icon: 'share.png',
                title: 'SHARE',
                description: 'Discover other similar minds that connect to you and inspire other artists. Connect your creativity with the World'
            },
            {
                icon: 'community.png',
                title: 'COMMUNITY',
                description: 'Make new friends through your design. The community exists to help and give you access to new information.'
            }
        ];
    }
})();
