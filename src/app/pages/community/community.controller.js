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
            console.log(vm.filterData);

            // vm.filter -> data 필드가 undefined로 들어가는 중
            // 밑에 어딘가 로직에서 엎어 쳐지는 듯 하다
            // 엎어쳐지는 부분 찾아서 수정할 것
            // 2016.11.09 23:09 -evan
            vm.filters = [{
                icon: 'fa-filter',
                options: getFilterData.result.postSort,
                data: vm.filterData.sort
            }];
            console.log(vm.filters[0].data);

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
            });
            return false;
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
            console.log(vm.filterData);

            FilterService.search(vm.filterData);
        };
    }
})();
