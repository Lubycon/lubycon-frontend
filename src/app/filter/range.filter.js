(function () {
    'use strict';

    // WHEN YOU USE ng-repeat,
    // IT WILL BE USED IN HTML(DOM) BY ARRAY
    // 2016-09-18 - evan

    angular
        .module('app')
        .filter('rangeFilter', rangeFilter);

    function rangeFilter(){
        var result = function(input,total){
            total = parseInt(total);
            for(var i = 0; i < total; ++i) {
                input.push(i);
            }
            return input;
        };

        return result;
    }
})();
