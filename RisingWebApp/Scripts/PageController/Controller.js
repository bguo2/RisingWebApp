﻿var app = angular.module('RisingWebApp');

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
        elem.on('keydown', function () {
            if (scope.requiredClass === "redbox") {
                elem.removeClass("redbox");
            }
        });
    }
});

function processAppForm($scope, formIdName, formNumber, $filter)
{
    $scope.disableInput = false;
    if ($scope.$parent.curIndex > 0) {
        $scope.$parent.applicationDescription = "Application " + $scope.$parent.applicationsNumber;
    }
    $scope.PersonalInfo = {};
    $scope.PersonalInfo.DriverLicense = {};
    $scope.PersonalInfo.AutoInfo = {};
    $scope.PersonalInfo.Emergency = {};
    $scope.ResidenceHistory = [];
    $scope.ResidenceHistory[0] = {};
    $scope.ResidenceHistory[1] = {};
    $scope.EmploymentHistory = [];
    $scope.EmploymentHistory[0] = {};
    $scope.EmploymentHistory[1] = {};
    $scope.CreditInfo = [];
    $scope.CreditInfo[0] = {};
    $scope.CreditInfo[1] = {};
    $scope.CreditInfo[2] = {};
    $scope.BankInfo = [];
    $scope.BankInfo[0] = {};
    $scope.BankInfo[1] = {};
    $scope.BankInfo[2] = {};
    $scope.References = [];
    $scope.References[0] = {};
    $scope.References[1] = {};
    $scope.Relatives = [];
    $scope.Relatives[0] = {};
    $scope.Relatives[1] = {};
    $scope.Agreement = {};
    $scope.Application = {
        "PersonalInfo": $scope.PersonalInfo,
        "ResidenceHistory": $scope.ResidenceHistory,
        "EmploymentHistory": $scope.EmploymentHistory,
        "CreditInfo": $scope.CreditInfo,
        "BankInfo": $scope.BankInfo,
        "References": $scope.References,
        "Relatives": $scope.Relatives,
        "Agreement": $scope.Agreement
    };
    $scope.incomeTypes = ['Week', 'Bi-Week', '3-Week', 'Month', 'Year'];
    $scope.EmploymentHistory[0].IncomeType = $scope.incomeTypes[0];
    $scope.EmploymentHistory[1].IncomeType = $scope.incomeTypes[0];
    $scope.Agreement.Agree = false;
    $scope.Agreement.SignDate = "";

    $scope.personalInfoShow = false;
    $scope.residenceShow = false;
    $scope.employmentShow = false;
    $scope.creditInfoShow = false;
    $scope.referenceShow = false;
    $scope.relativeShow = false;
    $scope.agreementShow = false;
    $scope.documentsShow = false;
    $scope.personalInfoDivClick = function () {
        $scope.personalInfoShow = !$scope.personalInfoShow;
    }
    $scope.residenceHistoryDivClick = function () {
        $scope.residenceShow = !$scope.residenceShow;
    }
    $scope.employmentDivClick = function () {
        $scope.employmentShow = !$scope.employmentShow;
    }
    $scope.creditInfoDivClick = function () {
        $scope.creditInfoShow = !$scope.creditInfoShow;
    }
    $scope.referenceDivClick = function () {
        $scope.referenceShow = !$scope.referenceShow;
    }
    $scope.relativeDivClick = function () {
        $scope.relativeShow = !$scope.relativeShow;
    }
    $scope.agreementDivClick = function () {
        $scope.agreementShow = !$scope.agreementShow;
    }
    $scope.documentsDivClick = function () {
        $scope.documentsShow = !$scope.documentsShow;
    }
       
    //radio clcik
    $scope.radioClick = function (event) {
        $(event.target).closest('div').removeClass("redbox");
    }

    $scope.agreementClick = function (event) {
        if ($scope.Agreement.Agree) {
            $scope.Agreement.SignDate = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm:ss');
            $(event.target).closest('span').removeClass("redbox");
        }
        else {
            $scope.Agreement.SignDate = "";
            $(event.target).closest('span').addClass("redbox");
        }
    }

    //browse file
    $scope.browseFile = function (event) {
        var file = $(event.target).parent().parent().parent().find('.file');
        file.trigger('click');
    }
 
    $scope.onUploadFile = function (files, element) {
        var target = $(element).parent().find('.form-control');
        target.val($(element).val().replace(/C:\\fakepath\\/i, ''));
        if (target.val().length > 0) {
            target.removeClass("redbox");
            var fd = new FormData();
            fd.append(element.name, files[0]);
        }
    }

    //the current application is enabled.
    $scope.$watch('$parent.applicationsNumber', function () {
        if (formNumber == $scope.$parent.applicationsNumber - 1) {
            $scope.$parent.Applications.push($scope.Application);
        }
    });
}

app.controller('ApplicationForm0', function ($scope, $timeout, $filter) {
    processAppForm($scope, '#form0', 0, $filter);
    //listen to the parent event
    $scope.$on('premisesDoneEvent', function (event, args) {
        if ($scope.$parent.curIndex === 0) {
            $scope.$parent.enableButtons();
            $scope.personalInfoShow = true;
        }
    });
});

app.controller('ApplicationForm1', function ($scope, $filter) {
    processAppForm($scope, '#form1', 1, $filter);
});

app.controller('ApplicationForm2', function ($scope, $filter) {
    processAppForm($scope, '#form2', 2, $filter);
});

app.controller('ApplicationForm3', function ($scope, $filter) {
    processAppForm($scope, '#form3', 3, $filter);
});

app.controller('HomeController', function ($scope, $rootScope, $location, $filter, $http, $timeout) {
    $scope.disableForms = true;
    $scope.disableSubmit = false;
    $scope.disableBackToPrevious = true;
    $scope.disableNextApplication = true;
    $scope.disableAddAnother = true;
    $scope.Premises = {};
    $scope.Applications = [];
    $scope.RentApplication = {
        "Premises": $scope.Premises,
        "Applications": $scope.Applications
    };
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
    $scope.$watch("Premises", function (newValue, oldValue) {
        if (Object.keys(newValue).length < 3) {
            return;
        }
        $timeout(function () {
            var incompletes = $('#premises .redbox');
            if (incompletes.length == 0) {
                //var find = $('#premises');
                //find.removeClass("yellow_background");
                //find.addClass("green_background");
                $scope.disableForms = false;
                $scope.$broadcast('premisesDoneEvent', true);
            }
        }, 100);
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
        previousButtonAction($scope);
    }

    //next application
    $scope.nextApplication = function () {
        nextButtonAction($scope);
    }

    $scope.enableButtons = function () {
        //if ($('#premises').hasClass('green_background')) {
            $scope.disableSubmit = false;
            $scope.disableAddAnother = false;
        //}
    }

    //submit
    $scope.submitForm = function () {      
        debugger;
        $http({
            url: '/api/Application',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify($scope.RentApplication)
        }).then(
            //successful
            function successCallback(response) {
                alert("success: " + response.statusText);
            },
            //error
            function errorCallback(response) {
                alert("error: " + response.statusText);
            });
    }
});

