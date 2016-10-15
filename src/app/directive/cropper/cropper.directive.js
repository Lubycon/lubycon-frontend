(function() {
    'use strict';

    angular
        .module('app')
        .directive('cropper', cropper);

    /* @ngInject */
    function cropper() {
        var directive = {
            restrict: 'A',
            scope: {
                previewer: '=',
                cropping: '='
            },
            link: link,
            controller: ['$rootScope','$scope','$element',controller]
        };

        return directive;

        function link($scope, $element, $attrs) {
            // SET OPTION...
            $.fn.cropper.setDefaults({
                minCanvasWidth: 150,
                minCanvasHeight: 150,
                minContainerWidth: 200,
                minContainerHeight: 200,
                aspectRatio: 1 / 1,
                autoCropArea: 0.6,
                viewMode: 3,
                center: true,
                responsive: true,
                moveable: true,
                preview: '.cropper-preview',
                dragMode: "crop"
            });

            $scope.$watch(function() {
                return $element[0].currentSrc;
            }, function(newValue, oldValue) {
                if(oldValue.legnth === 0) {
                    $scope.cropping = true;
                    $element.cropper();
                }
                else if(newValue !== oldValue) {
                    $scope.cropping = true;
                    $element.cropper("replace", newValue);
                }
                else return false;
            });
        }
        function controller($rootScope, $scope, $element) {

        }
    }
})();
