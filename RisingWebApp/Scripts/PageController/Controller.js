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
            if ($scope.$parent.curIndex == $scope.$parent.total - 1) {
                $scope.$parent.disableAddAnother = true;
            } else {
                $scope.$parent.disableAddAnother = false;
            }
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

app.controller('ApplicationForm0', function ($scope) {
    processAppForm($scope, '#form0', 0);
});

app.controller('ApplicationForm1', function ($scope) {
    processAppForm($scope, '#form1', 1);
});

app.controller('ApplicationForm2', function ($scope) {
    processAppForm($scope, '#form2', 2);
});

app.controller('ApplicationForm3', function ($scope) {
    processAppForm($scope, '#form3', 3);
});

app.controller('HomeController', function ($scope, $rootScope, $location, $filter, $http) {
    $scope.disableSubmit = true;
    $scope.disableBackToPrevious = true;
    $scope.disableNextApplication = true;
    $scope.disableAddAnother = true;
    $scope.applications = [];
    $scope.curIndex = 0;
    $scope.applicationsNumber = 1;
    $scope.total = 4;
    $scope.formShow = [];
    $scope.formShow[0] = true;
    for (i = 1; i < $scope.total; i++) {
        $scope.formShow[i] = false;
    }

    //add another application
    $scope.addAnotherApplication = function () {
        debugger;
        $scope.applicationsNumber++;
        //set the new application to be current one.
        $scope.curIndex = $scope.applicationsNumber - 1;
        $scope.formShow[$scope.curIndex] = true;
        for (i = 0; i < $scope.curIndex; i++) {
            $scope.formShow[i] = false;
        }
        if ($scope.curIndex == $scope.total - 1) {
            $scope.disableAddAnother = true;
        }
        $scope.disableBackToPrevious = false;
        $scope.disableNextApplication = true;
    }

    //back to previous
    $scope.backToPrevious = function () {
        debugger;
        $scope.curIndex--;
        if ($scope.curIndex == 0) {
            $scope.disableBackToPrevious = true;
        }
        if ($scope.curIndex <= $scope.applicationsNumber - 1) {
            $scope.disableNextApplication = false;
        }
        else {
            $scope.disableNextApplication = true;
        }

        $scope.formShow[$scope.curIndex] = true;
        for (i = 0; i < $scope.total; i++) {
            if (i == $scope.curIndex) {
                continue;
            }
            $scope.formShow[i] = false;
        }
    }

    //next application
    $scope.nextApplication = function () {
        debugger;
        $scope.curIndex++;
        $scope.formShow[$scope.curIndex] = true;
        if ($scope.curIndex >= $scope.applicationsNumber - 1) {
            $scope.disableNextApplication = true;
        }
        else {
            $scope.disableNextApplication = false;
        }
        $scope.disableBackToPrevious = false;
        for (i = 0; i < $scope.total; i++) {
            if (i == $scope.curIndex) {
                continue;
            }
            $scope.formShow[i] = false;
        }
    }

    //submit
    $scope.submitForm = function () {
        console.log($scope.applications);
    }
});

