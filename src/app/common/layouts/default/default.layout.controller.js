

(function(){
    'use strict';

    angular
        .module('common.layouts')
        .controller('DefaultLayoutController',DefaultLayoutController);

    function DefaultLayoutController(){
        var layout = this;
        layout.header = true;
        layout.footer = true;
    }
})();
