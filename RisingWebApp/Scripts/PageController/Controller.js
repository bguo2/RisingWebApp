var app = angular.module('RisingWebApp');

app.directive('input', function() {
    return {
        restrict: 'E',
        link: Link
    };

    function Link(scope, elem, attrs) {
        elem.on('change', function () {
            if (scope.requiredClass === "redbox") {
                elem.removeClass("redbox");
            }
        });
    }
});

function processAppForm($scope, formIdName, formNumber)
{
    if ($scope.$parent.curIndex > 0) {
        $scope.$parent.applicationDescription = "Application " + $scope.$parent.applicationsNumber;
    }
    $scope.personalInfo = {};
    $scope.application = {
        "personalInfo": $scope.personalInfo
    };

    $scope.personalInfoShow = false;
    $scope.personalInfoDivClick = function () {
        $scope.personalInfoShow = !$scope.personalInfoShow;
    }

    if (formNumber === 0) {
        $scope.requiredClass = "redbox";
    }
    else {
        $scope.requiredClass = "";
    }
    
    $scope.$watch('personalInfo', function (newValue, oldValue) {
        if (!angular.isUndefined($scope.personalInfo.apptype) && !angular.isUndefined($scope.personalInfo.fullName) &&
            !angular.isUndefined($scope.personalInfo.email)) {
            $scope.$parent.enableButtons();
            var find = $(formIdName + ' #personalInfoDiv');
            find.removeClass("yellow_background");
            find.addClass("green_background");
        }
    }, true);

    //listen to the parent event
    $scope.$on('premisesDoneEvent', function (event, args) {
        if (formNumber == $scope.$parent.curIndex) {
            $scope.personalInfoShow = true;
        }
    });
    
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
    $scope.disableForms = true;
    $scope.disableSubmit = true;
    $scope.disableBackToPrevious = true;
    $scope.disableNextApplication = true;
    $scope.disableAddAnother = true;
    $scope.premises = {};
    $scope.applications = [];
    $scope.curIndex = 0;
    $scope.applicationsNumber = 1;
    $scope.total = 4;
    $scope.formShow = [];
    $scope.formShow[0] = true;
    for (i = 1; i < $scope.total; i++) {
        $scope.formShow[i] = false;
    }
    $scope.applicationDescription = "Main Application ";
    $scope.requiredClass = "redbox";
    
    //basci section
    $scope.$watch("premises", function (newValue, oldValue) {
        if (!angular.isUndefined($scope.premises.address) && angular.isNumber($scope.premises.rent) && angular.isDate($scope.premises.movein_date)) {
            var find = $('#premises');
            find.removeClass("yellow_background");
            find.addClass("green_background");
            $scope.disableForms = false;
            $scope.$broadcast('premisesDoneEvent', true);
        }
    }, true);

    //add another application
    $scope.addAnotherApplication = function () {
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

    $scope.enableButtons = function () {
        if ($('#premises').hasClass('green_background')) {
            $scope.disableSubmit = false;
            $scope.disableAddAnother = false;
        }
    }

    //submit
    $scope.submitForm = function () {
        alert("submitted");
        console.log($scope.applications);
    }
});

