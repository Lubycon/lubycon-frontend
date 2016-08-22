(function() {
    'use strict';

    angular
        .module('app.pages.member')
        .controller('InsightController', InsightController);

    /** @ngInject */
    function InsightController($rootScope,$scope) {
        console.log('INSIGHT');
        var vm = this;

        // DUMMY DATA
        vm.data = {
            giveTake: {
                giveLike: 112,
                takeLike: 2081,
                giveBookmark: 32,
                takeBookmark: 134
            },
            country: [
                {
                    name: 'South Korea',
                    code: 200,
                    like: 1081
                },
                {
                    name: 'United States',
                    code: 229,
                    like: 511
                },
                {
                    name: 'Canada',
                    code: 37,
                    like: 102
                }
            ],
            timeline: {
                like: [
                    {date: '2016-01-02', value: 21},
                    {date: '2016-01-03', value: 3},
                    {date: '2016-01-04', value: 8}
                ],
                view: [
                    {date: '2016-01-02', value: 21},
                    {date: '2016-01-03', value: 3},
                    {date: '2016-01-04', value: 8}
                ],
                upload: [
                    {date: '2016-01-02', value: 21},
                    {date: '2016-01-03', value: 3},
                    {date: '2016-01-04', value: 8}
                ],
                download: [
                    {date: '2016-01-02', value: 21},
                    {date: '2016-01-03', value: 3},
                    {date: '2016-01-04', value: 8}
                ]
            },
            rangking: {}
        };
        // DUMMY DATA

        vm.giveTake = vm.data.giveTake;
        vm.country = vm.data.country;
        vm.timeline = vm.data.timeline;
        vm.rangking = vm.data.rangking;

        vm.init = (init)();

        function init(){
            // SET WORLDMAP DATA
            for(var i = 0; i < vm.country.length; i++){
                vm.country[i].mouseEnable = false;
                vm.country[i].color = '#48cfad';
            }
            console.log(vm.country);
        }
    }
})();
