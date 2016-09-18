(function() {
    'use strict';

    angular
        .module('app')
        .directive('rotateTool', rotateTool);

    /* @ngInject */
    function rotateTool() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directive/tools/3d/geometry/rotate.tmpl.html',
            scope: {
                scene: '=',
                renderer: '='
            },
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {
            $scope.toggleOn = false;
        }
        function controller($rootScope, $scope, $element) {

            $scope.toggleAction = function() {
                $scope.toggleOn = !$scope.toggleOn;

                // console.log($scope.scene,$scope.renderer);
                var object = $scope.scene.getObjectByName('mainObject'),
                    camera = $scope.scene.getObjectByName('mainCamera'),
                    existControl = $scope.scene.getObjectByName('objectController'),
                    control, gridHelper, axisHelper;

                if(existControl) {
                    control = $scope.scene.getObjectByName('objectController');
                    gridHelper = $scope.scene.getObjectByName("gridHelper");
                    axisHelper = $scope.scene.getObjectByName("axisHelper");

                    control.detach(object);
                    control.dispose();

                    $scope.scene.remove(control);
                    $scope.scene.remove(gridHelper);
                    $scope.scene.remove(axisHelper);
                }
                else {
                    control = new THREE.TransformControls(camera,$scope.renderer.domElement);
                    gridHelper = new THREE.GridHelper(3,20);
                    axisHelper = new THREE.AxisHelper(50);

                    control.name = 'objectController';
                    gridHelper.name = 'gridHelper';
                    axisHelper.name = 'axisHelper';

                    control.attach(object);

                    $scope.scene.add(control,gridHelper,axisHelper);

                    control.setMode("rotate");
                    control.space = "local";
                    control.update();
                }
            };
        }
    }
})();

// ROTATE LOGIC...


// if(checked){
//     objectControls = new THREE.TransformControls(camera,renderer.domElement);
//     gridHelper = new THREE.GridHelper(3,0.5);
//     axisHelper = new THREE.AxisHelper(50);
//
//     objectControls.name = "objectControls";


//     objectControls.addEventListener( 'change', pac.renderGL );


//     objectControls.attach(group);
//     gridHelper.name = "gridHelper";
//     axisHelper.name = "axisHelper";
//
//     scene.add(objectControls,gridHelper,axisHelper);
//     objectControls.setMode("rotate");
//     objectControls.space = "local";
//     objectControls.update();
// }
// else{
//     objectControls = scene.getObjectByName("objectControls");
//     gridHelper = scene.getObjectByName("gridHelper");
//     axisHelper = scene.getObjectByName("axisHelper");
//
//     objectControls.detach(group);
//     objectControls.dispose();
//
//     scene.remove(objectControls);
//     scene.remove(gridHelper);
//     scene.remove(axisHelper);
// }
