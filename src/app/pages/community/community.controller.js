(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .controller('CommunityController', [
            '$rootScope', '$scope', 'getCommunityRsv',
            CommunityController
        ]);

    /** @ngInject */
    function CommunityController(
        $rootScope, $scope, getCommunityRsv
    ) {
        console.log(getCommunityRsv.result);
        var vm = this;

        vm.lists = getCommunityRsv.result;

        // BIND FILTERS...
        vm.filterData = {
            sort: null
        };
        vm.filters = [{
            icon: 'fa-filter',
            options: ['Recent','Featured','Like','Download','Comment'],
            data: vm.filterData.sort
        }];
        vm.filterSubmit = function() {
            vm.filterData.sort = vm.filters[0].data;
            console.log(vm.filterData);
        };
    }
})();
