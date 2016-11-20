/*
    CC Code to String
    1    1    1    1
    by   nc   nd   sa
    -----------------
    by : This Content used CC
    nc : non Commercial
    nd : you can not modify and deploy this content
    sa : you can modify and share this content

    -> this filter is changed to translate service now
        2016.11.20 - evan
*/

(function () {
    'use strict';

    angular
        .module('app')
        .filter('licenseFilter', licenseFilter);

    function licenseFilter(){
        var result = function(input){
            switch(input) {
                case 1000 : return 'Free';
                case 1100 : return 'Non Commercial';
                case 1110 : return 'Non Commercial / Can not modify';
                case 1010 : return 'Can not modify';
                case 1101 : return 'Non Commercial / Can modify';
                default : return 'No license';
            }
        };

        return result;
    }
})();
