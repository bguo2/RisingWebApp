var app = angular.module('RisingWebApp');

function processAppForm($scope, formIdName, formNumber)
{
    $scope.basic = {};
    $scope.personalInfo = {};

    $scope.application = {
        "basic": $scope.basic,
        "personalInfo": $scope.personalInfo
    };

    $scope.personalInfoShow = true;

    //basci section
    $scope.$watch("basic", function (newValue, oldValue) {
        if (!angular.isUndefined($scope.basic.apptype) && !angular.isUndefined($scope.basic.premises) && angular.isNumber($scope.basic.rent)
            && angular.isDate($scope.basic.movein_date)) {
            var find = $(formIdName + ' #basicDiv');
            find.removeClass("yellow_background");
            find.addClass("green_background");
            $scope.personalInfoShow = true;
            
            //enable submit button
            $scope.$parent.disableSubmit = false;
        }
    }, true);

    $scope.personalInfoShow = false;
    $scope.personalInfoDivClick = function () {
        $scope.personalInfoShow = !$scope.personalInfoShow;
    }
    //personal information section.

    //the current application is enabled.
    $scope.$watch('$parent.curIndex', function () {
        if (formNumber == $scope.$parent.curIndex) {
            $scope.$parent.applications.push($scope.application);
        }
    });
}

app.controller('ApplicationForm0', function ($scope, $rootScope, $location, $filter, $http) {
    processAppForm($scope, '#form0', 0);
});

app.controller('ApplicationForm1', function ($scope, $rootScope, $location, $filter, $http) {
    processAppForm($scope, '#form1', 1);
});

app.controller('HomeController', function ($scope, $rootScope, $location, $filter, $http) {
    $scope.disableSubmit = true;
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
        if ($scope.curIndex == $scope.total - 1) {
            return;
        }

        $scope.curIndex++;
        $scope.formShow[$scope.curIndex] = true;
        for (i = 0; i < $scope.curIndex; i++) {
            $scope.formShow[i] = false;
        }
    }

    //submit
    $scope.submitForm = function () {
        alert("submit");
        console.log($scope.applications);
    }
});

