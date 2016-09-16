(function () {
    'use strict';

    angular
        .module('app')
        .filter('camelCaseFilter', camelCaseFilter);

    function camelCaseFilter(){
        var result = function(input){
            var output = input.replace( /([A-Z])/g, " $1" );
                output = output.charAt(0).toUpperCase() + output.slice(1);

            return output;
        };

        return result;
    }
})();
