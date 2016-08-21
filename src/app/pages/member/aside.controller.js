(function() {
    'use strict';

    angular
        .module('app.pages.member')
        .controller('MemberAsideController', MemberAsideController);

    /** @ngInject */
    function MemberAsideController($rootScope,$scope,API_CONFIG) {
        var contentHost = API_CONFIG.content;
        var vm = this;

        // DUMMY DATA
        vm.member = {

        };
        // DUMMY DATA
    }
})();
