(function() {
    'use strict';

    angular
        .module('app')
        .directive('lightTool', lightTool);

    /* @ngInject */
    function lightTool() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directive/tools/3d/light/lightTool.tmpl.html',
            scope: {
                scene: '=',
                renderer: '='
            },
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {

        }
        function controller($rootScope, $scope, $element) {
            'use stict';
            console.log($scope.scene);
            // var light = new THREE.DirectionalLight(0xff0000,0.5);
            //     light.position.x = -2;
            //     light.position.y = -2;
            //     light.position.z = -2;
            // $scope.scene.add(light);
        }
    }
})();
