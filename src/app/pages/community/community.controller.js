(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .controller('CommunityController', [
            '$window', '$rootScope', '$scope', '$state', '$stateParams',
            'Restangular', 'infiniteScrollService', 'getCommunityRsv',
            CommunityController
        ]);

    /** @ngInject */
    function CommunityController(
        $window, $rootScope, $scope, $state, $stateParams,
        Restangular, infiniteScrollService, getCommunityRsv
    ) {
        console.log(getCommunityRsv);
        var vm = this;
        var api = Restangular.all('posts/'+ $stateParams.category);
        var pageIndex = 1;

        vm.lists = getCommunityRsv.result;
        vm.scrollDisabled = false;

        vm.onScroll = function() {
            vm.scrollDisabled = true;
            getList();
        };

        function getList() {
            api.customGET('',{
                pageIndex: pageIndex
            }).then(function(res) {
                pageIndex++;

                vm.lists = $.merge(vm.lists,res.result);
                console.log(vm.lists.length);

                vm.scrollDisabled = false;
            });
        }

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
