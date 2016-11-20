(function () {
    'use strict';

    angular
        .module('services')
        .factory('ModelControlService', [
            '$rootScope', 'ControllerKeyActionService',
            ModelControlService
        ]);

    function ModelControlService($rootScope, ControllerKeyActionService) {
        var service = {
            attach: attach,
            detach: detach,
            remove: remove
        };

        var config = {
            controller: {
                name: 'objectController'
            },
            gridHelper: {
                name: 'gridHelper',
                size: 3,
                step: 20
            },
            axisHelper: {
                name: 'axisHelper',
                size: 50
            }
        };

        return service;

        // ALL FEATURE
        function attach(scene,renderer,mode) {
            var object = scene.getObjectByName('mainObject'),
                camera = scene.getObjectByName('mainCamera');
            var controller = scene.getObjectByName('objectController'),
                gridHelper = scene.getObjectByName('gridHelper'),
                axisHelper = scene.getObjectByName('axisHelper');

            if(controller && gridHelper && axisHelper) {
                gridHelper.visible = true;
                axisHelper.visible = true;
                controller.attach(object);
                controller.update();
            }
            else {
                console.log('controller',controller,'gridHelper',gridHelper,'axisHelper',axisHelper);
                controller = new THREE.TransformControls(camera,renderer.domElement);
                gridHelper = new THREE.GridHelper(config.gridHelper.size,config.gridHelper.step);
                axisHelper = new THREE.AxisHelper(config.axisHelper.size);

                controller.name = config.controller.name;
                gridHelper.name = config.gridHelper.name;
                axisHelper.name = config.axisHelper.name;

                controller.attach(object);

                scene.add(controller,gridHelper,axisHelper);

                if(mode) {
                    if(mode === 'scale') controller.setMode('scale');
                    else if(mode === 'translate') controller.setMode('translate');
                    else controller.setMode('rotate');
                }
                else {
                    controller.setMode('rotate');
                    ControllerKeyActionService.start(controller);
                }

                controller.space = 'local';
                controller.update();
            }
        }

        function detach(scene) {
            // THIS METHOD WILL NOT BE REMOVE OBJECTS
            // SO THESE OBJECTS STILL BE IN SCENE.
            var controller = scene.getObjectByName('objectController'),
                gridHelper = scene.getObjectByName('gridHelper'),
                axisHelper = scene.getObjectByName('axisHelper');

            if(controller && gridHelper && axisHelper) {
                controller.detach();
                gridHelper.visible = false;
                axisHelper.visible = false;
                ControllerKeyActionService.stop();
            }
        }

        function remove(scene,renderer) {
            var controller = scene.getObjectByName('objectController'),
                gridHelper = scene.getObjectByName('gridHelper'),
                axisHelper = scene.getObjectByName('axisHelper');
            if(controller && gridHelper && axisHelper) {
                controller.detach();
                controller.dispose();

                scene.remove(controller);
                scene.remove(gridHelper);
                scene.remove(axisHelper);
                ControllerKeyActionService.stop();
            }
        }
    }
})();
