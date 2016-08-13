(function() {
    'use strict';

    angular
        .module('app.pages.contents')
        .controller('ContentsController', ContentsController);

    /** @ngInject */
    function ContentsController($rootScope,$scope) {
        var vm = this;

        vm.contents = [ //DUMMY DATA
            {
                code : 1,
                title: "TEST CARD",
                category: ""
            }
        ]
    }
})();
