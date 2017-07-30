var app = angular.module('RisingWebApp');


app.controller('ApplicationForm', function ($scope, $rootScope, $location, $filter, $http) {
    $scope.basic = {};
    $scope.personalInfo = {};

    $scope.application = {
        "basic": $scope.basic,
        "personalInfo": $scope.personalInfo
    };

    //basci section
    $scope.$watch("basic", function () {
        if (!angular.isUndefined($scope.basic.apptype) && !angular.isUndefined($scope.basic.premises) && angular.isNumber($scope.basic.rent)
            && angular.isDate($scope.basic.movein_date)) {
            $('#basicDiv').removeClass("yellow_background");
            $('#basicDiv').addClass("green_background");
            $('#personalInfo').collapse({
                toggle: true
            });
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

    //personal information section.

    $scope.$parent.applications.push($scope.application);
});

app.controller('HomeController', function ($scope, $rootScope, $location, $filter, $http) {
    $scope.applications = [];
 
    //add another application
    $scope.addAnotherApplication = function () {

    }

    //submit
    $scope.submitForm = function () {
        console.log($scope.applications);
    }
});

