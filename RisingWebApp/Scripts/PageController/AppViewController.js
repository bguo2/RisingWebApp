var app = angular.module('RisingWebApp');

if (window.JSON && !window.JSON.dateParser) {
    var reISO = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})Z/;

    JSON.dateParser = function (key, value) {
        debugger;
        if (typeof value === 'string') {
            var a = reISO.exec(value);
            if (a)
                return new Date(value);
        }
        return value;
    };

}

function viewAppForm($scope, formIdName, formNumber, $timeout) {
    if ($scope.$parent.curIndex > 0) {
        $scope.$parent.applicationDescription = "Application " + $scope.$parent.applicationsNumber;
    }

    $scope.$watch('$parent.curIndex', function () {
        if ($scope.$parent.curIndex == formNumber) {
            $scope.PersonalInfo = $scope.$parent.Applications[formNumber].PersonalInfo;
            $timeout(function () {
                var find = $(formIdName + ' #personalInfoDiv');
                find.removeClass("yellow_background");
                find.addClass("green_background");
            }, 100);
        }
    });

    $scope.personalInfoShow = false;
    $scope.personalInfoDivClick = function () {
        $scope.personalInfoShow = !$scope.personalInfoShow;
    }

    //radio clcik
    $scope.radioClick = function (event) {
    }
}

app.controller('ApplicationForm00', function ($scope, $rootScope, $location, $filter, $http, $timeout) {
    viewAppForm($scope, '#form0', 0, $timeout);
});

app.controller('ApplicationForm01', function ($scope, $rootScope, $location, $filter, $http, $timeout) {
    viewAppForm($scope, '#form1', 1, $timeout);
});

app.controller('ApplicationForm02', function ($scope, $rootScope, $location, $filter, $http, $timeout) {
    viewAppForm($scope, '#form2', 2, $timeout);
});

app.controller('ApplicationForm03', function ($scope, $rootScope, $location, $filter, $http, $timeout) {
    viewAppForm($scope, '#form3', 3, $timeout);
});

app.controller('AppViewController', function ($scope, $rootScope, $location, $filter, $http, $timeout) {
    
    $scope.disableBackToPrevious = true;
    $scope.disableNextApplication = true;
    $scope.disableForms = false;
    $scope.disableInput = true;
    $scope.applicationsNumber = 1;
    $scope.curIndex = 0;
    $scope.applicationDescription = "Main Application";
    $scope.formShow = [];

    //error?
    $scope.showErrorMsg = false;
    if (errorMsg.length > 0) {
        $scope.showErrorMsg = true;
        $scope.errorMsga = errorMsg;
        $scope.applicationsNumber = 1;
        $scope.total = 1;
        for (i = 0; i < 4; i++) {
            $scope.formShow[i] = false;
        }
    }
    else {
        var rentApplication = JSON.parse(rentAppData, JSON.dateParser);
        $scope.Premises = rentApplication.Premises;        
        $scope.Applications = rentApplication.Applications;
        $scope.applicationsNumber = rentApplication.Applications.length;
        $scope.total = $scope.applicationsNumber;

        $scope.formShow[0] = true;
        for (i = 1; i < $scope.total; i++) {
            $scope.formShow[i] = false;
        }
    }

    $scope.backToPrevious = function () {
        previousButtonAction($scope);
    }

    $scope.nextApplication = function () {
        nextButtonAction($scope);
    }

});