(function() {
    'use strict';

    angular
        .module('app')
        .directive('cropper', cropper);

    /* @ngInject */
    function cropper() {
        var directive = {
            restrict: 'A',
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {
            $scope.$watch(function() {
                return $element[0].currentSrc;
            }, function(newValue, oldValue) {
                if(oldValue.legnth === 0) $element.cropper({
                    minCanvasWidth: 150,
                    minCanvasHeight: 150,
                    minContainerWidth: 200,
                    minContainerHeight: 200,
                    aspectRatio: 1 / 1,
                    autoCropArea: 0.6,
                    viewMode: 3,
                    responsive: true,
                    moveable: true,
                    preview: "#cropper-preview",
                    dragMode: "crop"
                });
                else if(newValue !== oldValue) $element.cropper("replace", newValue);
                else return false;
            });
        }
        function controller($rootScope, $scope, $element) {

        }
    }
})();
