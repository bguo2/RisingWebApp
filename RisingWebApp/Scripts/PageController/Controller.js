var app = angular.module('RisingWebApp');

function processAppForm($scope)
{
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
}

app.controller('ApplicationForm0', function ($scope, $rootScope, $location, $filter, $http) {
    processAppForm($scope);
});

app.controller('ApplicationForm1', function ($scope, $rootScope, $location, $filter, $http) {
    processAppForm($scope);
});

app.controller('HomeController', function ($scope, $rootScope, $location, $filter, $http) {
    $scope.applications = [];
    $scope.curIndex = 0;
    $scope.total = 2;
    $scope.formShow = [];
    $scope.formShow[0] = true;
    for (i = 1; i < $scope.total; i++) {
        $scope.formShow[i] = false;
    }

    //add another application
    $scope.addAnotherApplication = function () {
        $scope.curIndex++;
        $scope.formShow[$scope.curIndex] = true;
        for (i = 0; i < $scope.curIndex; i++) {
            $scope.formShow[i] = false;
        }
    }

    //submit
    $scope.submitForm = function () {
        console.log($scope.applications);
    }
});

