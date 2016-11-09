(function() {
    'use strict';

    angular
        .module('app.pages.community')
        .controller('CommunityController', [
            '$window', '$rootScope', '$scope', '$state', '$stateParams',
            'Restangular', 'InfiniteScrollService', 'FilterService',
            'getFilterData',
            CommunityController
        ]);

    /** @ngInject */
    function CommunityController(
        $window, $rootScope, $scope, $state, $stateParams,
        Restangular, InfiniteScrollService, FilterService,
        getFilterData
    ) {
        var vm = this;
        var apiURI = 'posts/' + $stateParams.category;
        var pageIndex = 1;

        vm.scrollDisabled = true;

        vm.init = (init)();

        function init() {
            // BIND FILTERS...
            vm.filterData = FilterService.getParams();
            if(!vm.filterData) {
                vm.filterData = {
                    sort: null
                };
            }

            vm.filters = [{
                icon: 'fa-filter',
                options: getFilterData.result.postSort,
                data: vm.filterData.sort
            }];

            console.log(vm.filterData);
            InfiniteScrollService.init(vm.filterData);

            InfiniteScrollService.get(apiURI).then(function(res) {
                bindList(res.result);
                vm.scrollDisabled = false;
            });
        }

        function getList() {
            InfiniteScrollService.get(apiURI).then(function(res) {
                bindList(res.result);

                vm.scrollDisabled = false;
                return false;
            });
        }

        function bindList(newList) {
            if(!vm.list) vm.list = [];

            if(newList) vm.list = $.merge(vm.list, newList);
        }

        vm.onScroll = function() {
            vm.scrollDisabled = true;
            getList();
        };

        vm.filterSubmit = function() {
            vm.filterData.sort = vm.filters[0].data;

            FilterService.search(vm.filterData);
        };
    }
})();
