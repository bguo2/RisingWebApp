var app = angular.module('RisingWebApp');

function viewAppForm($scope, formIdName, formNumber) {
    if ($scope.$parent.curIndex > 0) {
        $scope.$parent.applicationDescription = "Application " + $scope.$parent.applicationsNumber;
    }

    $scope.personalInfoShow = true;
    $scope.personalInfoDivClick = function () {
        $scope.personalInfoShow = !$scope.personalInfoShow;
    }

    //radio clcik
    $scope.radioClick = function (event) {
    }
}

app.controller('ApplicationForm00', function ($scope) {
    viewAppForm($scope, '#form0', 0);
});

app.controller('ApplicationForm01', function ($scope) {
    viewAppForm($scope, '#form1', 1);
});

app.controller('ApplicationForm02', function ($scope) {
    viewAppForm($scope, '#form2', 2);
});

app.controller('ApplicationForm03', function ($scope) {
    viewAppForm($scope, '#form3', 3);
});

app.controller('AppViewController', function ($scope, $rootScope, $location, $filter, $http, $timeout) {
    
    $scope.disableBackToPrevious = true;
    $scope.disableNextApplication = true;
    $scope.disableForms = false;
    $scope.disableInput = true;
    $scope.applicationsNumber = 1;
    $scope.curIndex = 0;
    $scope.applicationDescription = "Main Application";

    //error?
    $scope.showErrorMsg = false;
    if (errorMsg.length > 0) {
        $scope.showErrorMsg = true;
        $scope.errorMsga = errorMsg;
        $scope.applicationsNumber = 1;
        $scope.total = 1;
    }
    else {
        var rentApplication = JSON.parse(rentAppData);
        $scope.Premises = rentApplication.Premises;
        $scope.Applications = rentApplication.Applications;
        $scope.applicationsNumber = rentApplication.Applications.length;
        $scope.total = $scope.applicationsNumber;
    }


    $scope.formShow = [];
    $scope.formShow[0] = true;
    for (i = 1; i < $scope.total; i++) {
        $scope.formShow[i] = false;
    }

    $scope.backToPrevious = function () {
        previousButtonAction($scope);
    }

    $scope.nextApplication = function () {
        nextButtonAction($scope);
    }

});