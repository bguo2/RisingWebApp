var app = angular.module('RisingWebApp', ['ngRoute'])
   .config([
    '$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        $routeProvider
        .when('/', { // For Home Page
            templateUrl: '/Static/Applications.html',
            controller: 'HomeController'
        })
        .when('/Home/ViewApplication', {
            templateUrl: '/Static/ViewApplication.html',
            controller: 'AppViewController'
        })
        .otherwise({   // This is when any route not matched => error
            controller: 'ErrorController'
        })
    }]);