(function() {
    'use strict';

    angular
        .module('app.pages.editor')
        .controller('Editor3dController', Editor3dController);

    /** @ngInject */
    function Editor3dController($rootScope, $scope, $filter, $compile ,$timeout) {
        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;

        // CONFIG...
        vm.editorSet = '3d';

        // WEBGL SETTING...
        vm.scene = new THREE.Scene();
        vm.renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true });
        // WEBGL SETTING...

        vm.config = {
            headerTools: [{
                name: 'fileUpload',
                icon: 'fa-folder'
            }],
            tools: [{
                name: 'lightTool',
                type: 'open',
                icon: 'fa-lightbulb-o',
                subTools: []
            },{
                name: 'geometryTool',
                type: 'open',
                icon: 'fa-cube',
                subTools: [{
                    name: 'rotate',
                    category: 'switch',
                    directive: '<rotate-tool scene="vm.scene" renderer="vm.renderer"></rotate-tool>'
                },{
                    name: 'reset',
                    category: 'buttons',
                    directive: '<rotate-reset-tool></rotate-reset-tool>'
                },{
                    name: 'mode',
                    category: 'buttons',
                    directive: '<view-mode-tool></view-mode-tool>'
                }]
            },{
                name: 'materialTool',
                type: 'open',
                icon: 'fa-square',
                subTools: []
            },{
                name: 'mapTool',
                type: 'open',
                icon: 'fa-picture-o',
                subTools: []
            }]
        };
        vm.toolEnabled = {};
        // CONFIG...

        vm.init = (init)();

        function init(){
            $timeout(function(){
                bindSubTools(vm.config.tools)
            },0);
        }

        function bindSubTools(tools){
            console.log(tools);
            for(var i = 0; i < tools.length; i++){
                var subTools = tools[i].subTools;
                if(subTools.length > 0){
                    for(var j = 0; j < subTools.length; j++){
                        var target = angular.element(document).find('.sub-tools[data-value="'+subTools[j].name+'"]');
                        subTools[j].directive = $compile(subTools[j].directive)($scope);
                        subTools[j].directive.appendTo(target);
                    }
                }
            }
        }

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
