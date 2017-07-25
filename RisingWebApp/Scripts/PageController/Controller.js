var app = angular.module('RisingWebApp');

app.controller('HomeController', function ($scope, $rootScope, $location, $http) {
    $scope.basic = {};
    $scope.$watch("basic", function () {
        if (!angular.isUndefined($scope.basic.apptype) && !angular.isUndefined($scope.basic.premises) && angular.isNumber($scope.basic.rent)
            && angular.isDate($scope.basic.movein_date)) {
            $('#basicDiv').removeClass("yellow_background");
            $('#basicDiv').addClass("green_background");
        }
    }, true);

    $('#personalInfo').on('show.bs.collapse', function () {
        $('#callapseIcon3').removeClass("glyphicon-menu-down");
        $('#callapseIcon3').addClass("glyphicon-menu-up");
    });
    $('#personalInfo').on('hide.bs.collapse', function () {
        $('#callapseIcon3').addClass("glyphicon-menu-down");
        $('#callapseIcon3').removeClass("glyphicon-menu-up");
    });


});
