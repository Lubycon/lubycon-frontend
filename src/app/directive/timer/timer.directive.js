(function() {
    'use strict';

    angular
    .module('app')
    .directive('timer', timer);

    /* @ngInject */
    function timer() {
        var directive = {
            restrict: 'EA',
            scope: {
                time: '=',
                maxUnit: '@',
                interval: '=',
                direction: '@',
                days: '=?',
                hours: '=?',
                minutes: '=?',
                seconds: '=?'
            },
            link: link,
            controller: ['$scope','$element','$attrs','$interval','$compile',controller]
        };

        return directive;

        function link($scope, $element, $attrs) {

        }
        function controller($scope, $element, $attrs, $interval, $compile) {
            if ($element.html().trim().length === 0) {
                $element.append($compile('<span>' + $interpolate.startSymbol() + 'millis' + $interpolate.endSymbol() + '</span>')($scope));
            } else {
                $element.append($compile($element.contents())($scope));
            }


            $interval(function() {
                $scope.time -= 1;
                calculate();
                $scope.$emit('tick',{time: $scope.time});
            },1000);


            $scope.$on('tick',function(event, param) {

            });

            function calculate() {
                if($scope.time) {
                    if($scope.maxUnit === 'day') {
                        $scope.seconds = Math.floor(($scope.time) % 60);
                        $scope.minutes = Math.floor((($scope.time / (60)) % 60));
                        $scope.hours = Math.floor((($scope.time / (3600)) % 24));
                        $scope.days = Math.floor((($scope.time / (3600)) / 24));
                        $scope.months = 0;
                        $scope.years = 0;
                    }
                    else if($scope.maxUnit === 'hour') {
                        $scope.seconds = Math.floor(($scope.time) % 60);
                        $scope.minutes = Math.floor((($scope.time / (60)) % 60));
                        $scope.hours = Math.floor($scope.time / 3600);
                        $scope.days = 0;
                        $scope.months = 0;
                        $scope.years = 0;
                    }
                    else if($scope.maxUnit === 'minute') {
                        $scope.seconds = Math.floor(($scope.time) % 60);
                        $scope.minutes = Math.floor($scope.time / 60);
                        $scope.hours = 0;
                        $scope.days = 0;
                        $scope.months = 0;
                        $scope.years = 0;
                    }
                    else if($scope.maxUnit === 'second') {
                        $scope.seconds = Math.floor($scope.time);
                        $scope.minutes = 0;
                        $scope.hours = 0;
                        $scope.days = 0;
                        $scope.months = 0;
                        $scope.years = 0;
                    }
                    else if ($scope.maxTimeUnit === 'month') {
                        $scope.seconds = Math.floor(($scope.time) % 60);
                        $scope.minutes = Math.floor((($scope.time / (60)) % 60));
                        $scope.hours = Math.floor((($scope.time / (3600)) % 24));
                        $scope.days = Math.floor((($scope.time / (3600)) / 24) % 30);
                        $scope.months = Math.floor((($scope.time / (3600)) / 24) / 30);
                        $scope.years = 0;
                    } else if ($scope.maxTimeUnit === 'year') {
                        $scope.seconds = Math.floor(($scope.time) % 60);
                        $scope.minutes = Math.floor((($scope.time / (60)) % 60));
                        $scope.hours = Math.floor((($scope.time / (3600)) % 24));
                        $scope.days = Math.floor((($scope.time / (3600)) / 24) % 30);
                        $scope.months = Math.floor((($scope.time / (3600)) / 24 / 30) % 12);
                        $scope.years = Math.floor(($scope.time / (3600)) / 24 / 365);
                    }
                    else return false;
                }
            }
        }
    }
})();
