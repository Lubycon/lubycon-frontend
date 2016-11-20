(function () {
    'use strict';

    angular
        .module('services')
        .factory('LightGenerateService', [
            '$rootScope', LightGenerateService
        ]);

    function LightGenerateService($rootScope) {
        var service = {
            create: create,
            destroy: destroy,
            control: {
                attach: attachControl,
                detach: detachControl,
                remove: removeControl,
                lastTarget: null
            }
        };

        return service;

        function create(scene,config,lightName) {
            // type = ['directional, spot, point']
            var group = new THREE.Group(),
                light, helper;

            switch(config.type) {
                case 'directional' :
                    light = new THREE.DirectionalLight(new THREE.Color(config.color),config.intensity * 0.01);
                    helper = new THREE.DirectionalLightHelper(light,1);
                break;
                case 'spot' :
                    light = new THREE.SpotLight(new THREE.Color(config.color),config.intensity * 0.01);
                    helper = new THREE.SpotLightHelper(light);
                    light.angle = config.angle * 0.01;
                    light.decay = 1.5;
                    light.distance = config.distance;
                    light.penumbra = config.softness * 0.01;
                break;
                case 'point' :
                    light = new THREE.PointLight(new THREE.Color(config.color),config.intensity * 0.01,100);
                    helper = new THREE.PointLightHelper(light,1);
                    light.decay = 1.5;
                break;
                default: return false;
            }

            light.position.y = 1;
            light.helper = helper;

            group.add(light,helper);
            group.name = lightName;

            return group;
        }

        function destroy(scene,name) {
            scene.remove(scene.getObjectByName(name));
        }

        function attachControl(scene,renderer,lightName) {
            var isExist = scene.getObjectByName('lightController');
            var controller, camera;
            camera = scene.getObjectByName('mainCamera');

            if(isExist) {
                controller = isExist;
                console.log(controller);
                controller.detach();
            }
            else {
                controller = new THREE.TransformControls(camera,renderer.domElement);
                controller.name = 'lightController';

                scene.add(controller);

                controller.setMode('translate');
                controller.space = 'world';
                controller.setSize(1);
            }

            if(lightName) controller.attach(scene.getObjectByName(lightName).children[0]);
            else controller.attach(scene.getObjectByName(this.lastTarget).children[0]);

            controller.update();
            controller.visible = true;
            this.lastTarget = controller.object.parent.name;
        }

        function detachControl(scene) {
            var controller = scene.getObjectByName('lightController');
            if(controller) {
                controller.detach();
                controller.visible = false;
            }
        }

        function removeControl(scene) {
            var controller = scene.getObjectByName('lightController');

            if(controller) {
                controller.detach();
                controller.dispose(); // CLEAR MEMORY
                scene.remove(controller);
            }
        }
    }
})();
