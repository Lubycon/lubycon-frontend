(function() {
    'use strict';

    angular
        .module('app.pages.contents')
        .controller('ContentsController', [
            '$rootScope', '$scope', '$state', '$stateParams',
            'InfiniteScrollService', 'FilterService',
            'getFilterData', ContentsController
        ]);

    /** @ngInject */
    function ContentsController(
        $rootScope, $scope, $state, $stateParams,
        InfiniteScrollService, FilterService,
        getFilterData
    ) {
        var vm = this;
        var apiURI = 'contents/' + $stateParams.category;

        vm.scrollDisabled = true;

        // PUBLIC METHOD
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
                options: getFilterData.result.data,
                data: vm.filterData.sort
            }];
            console.log(vm.filters[0].data);
            // BIND FILTERs...

            InfiniteScrollService.init(vm.filterData);

            InfiniteScrollService.get(apiURI).then(function(res) {
                bindList(res.result.contents);
                vm.totalCount = res.result.totalCount;
                vm.scrollDisabled = false;
            });
            return false;
        }

        vm.onScroll = function() {
            vm.scrollDisabled = true;
            getList();
        };

        vm.filterSubmit = function() {
            vm.filterData.sort = vm.filters[0].data;
            console.log(vm.filterData);

            FilterService.search(vm.filterData);
        };

        // PRIVATE METHOD
        function getList() {
            // FULL ITEM EXCPETION
            if(vm.list.length >= vm.totalCount) return false;
            // FULL ITEM EXCEPTION

            InfiniteScrollService.get(apiURI).then(function(res) {
                console.log(res.result.contents);
                bindList(res.result.contents);

                vm.scrollDisabled = false;
            });
            return false;
        }

        function bindList(newList) {
            if(!vm.list) vm.list = [];

            if(newList) vm.list = $.merge(vm.list, newList);
        }
    }
})();
