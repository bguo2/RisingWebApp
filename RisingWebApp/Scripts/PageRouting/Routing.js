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
            templateUrl: '/Static/Apply.html',
            controller: 'HomeController'
        })
        .otherwise({   // This is when any route not matched => error
            controller: 'ErrorController'
        })
    }]);