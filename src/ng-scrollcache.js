/*
* angular-mobile-nav by Andy Joslin
* http://github.com/ajoslin/angular-mobile-nav
* @license MIT License http://goo.gl/Z8Nlo
* Modified to be compatible with AnfularJS ui-router
*/

angular.module('ng-scrollcache', [])
.directive('ngCacheScrolling', ['$timeout', '$state', '$rootScope', function ($timeout, $state, $rootScope) {
    return {
        restrict: 'EA',
        link: function(scope, elm, attrs) {
            var route = $state.current ? $state.current.views.main : {};
            var template = route.templateUrl || route.template;

            //On scope creation, see if we remembered any scroll for this templateUrl
            //If we did, set it
            if (template) {
                //Set oldScroll after a timeout so the page has time to fully load
                $timeout(function () {
                    var oldScroll = $rootScope.scrollCache[template];
                    if (oldScroll) {
                        window.scrollTo(0, oldScroll);
                    }
                }, 100);

                scope.$on('$destroy', function () {
                    $rootScope.scrollCache[template] = window.scrollY;
                });
            }
        }
    };
}]);
