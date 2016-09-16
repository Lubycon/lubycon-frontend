(function() {
    'use strict';

    angular
        .module('app.pages.editor')
        .controller('Editor3dController', Editor3dController);

    /** @ngInject */
    function Editor3dController($rootScope, $scope, $filter, $sce, $compile) {
        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;

        vm.a = new THREE.Scene(); // TESTING
        // CONFIG...
        vm.editorSet = '3d';
        vm.config = {
            headerTools: [{
                name: 'fileUpload',
                icon: 'fa-folder'
            }],
            tools: [{
                name: 'lightTool',
                type: 'open',
                icon: 'fa-lightbulb-o',
                subTools: [{
                    name: 'rotate',
                    category: 'switch',
                    directive: '<light-tool scene="vm.a"></light-tool>'
                },{
                    name: 'reset',
                    category: 'buttons',
                    directive: '<rotate-reset-tool></rotate-reset-tool>'
                },{
                    name: 'mode',
                    category: 'buttons',
                    directive: '<light-tool></light-tool>'
                }]
            },{
                name: 'geometryTool',
                type: 'open',
                icon: 'fa-cube'
            },{
                name: 'materialTool',
                type: 'open',
                icon: 'fa-square'
            },{
                name: 'mapTool',
                type: 'open',
                icon: 'fa-picture-o'
            }]
        };
        vm.toolEnabled = {};
        // CONFIG...

        vm.toolboxToggle = function(name){
            var keys = Object.keys(vm.toolEnabled);
            for(var i = 0; i < keys.length; i++){
                if(keys[i] === name) continue;
                vm.toolEnabled[keys[i]] = false;
            }
            if(!vm.toolEnabled[name]) vm.toolEnabled[name] = true;
            else vm.toolEnabled[name] = false;
        };

        // GEOMETRY TOOL....
        vm.ratateToggle = function(){

        };
        vm.rotateReset = function(){

        };
        vm.renderMode = function(){

        };
        // MATERIAL TOOL....

        // MAP TOOL....

        // LIGHT TOOL....
    }
})();
