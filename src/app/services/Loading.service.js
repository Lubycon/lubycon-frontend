(function () {
    'use strict';

    angular
        .module('services')
        .factory('LoadingService', ['$rootScope', LoadingService]);

    function LoadingService($rootScope) {

        var service = {
            start: start,
            end: end
        };

        return service;

        // PUBLIC METHOD
        function start(kind) {
            return eval(kind + 'Start')();
        }

        function end(kind) {
            return eval(kind + 'End')()
        }

        // PRIVATE METHOD

        function pageStart() {
            var body = angular.element('body'),
                element = angular.element('<div/>',{ class: 'loading-div', id: 'loading-element' }),
                background = angular.element('<div/>',{ class: 'loading-div-background' });

            background.appendTo(element);
            element.appendTo(body);
        }

        function pageEnd() {
            var element = angular.element('body').find('.loading-div').fadeOut(400, function() {
                angular.element(this).remove();
            });
        }
    }
})();
