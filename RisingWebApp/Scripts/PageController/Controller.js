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
    //this won't be passed to backend. internal use only in Javascripts
    $scope.Attachments = {};
    $scope.Documents = [];
    $scope.Documents[0] = {};
    $scope.Documents[1] = {};
    $scope.Documents[2] = {};
    $scope.Documents[3] = {};
    $scope.Application = {
        "PersonalInfo": $scope.PersonalInfo,
        "ResidenceHistory": $scope.ResidenceHistory,
        "EmploymentHistory": $scope.EmploymentHistory,
        "CreditInfo": $scope.CreditInfo,
        "BankInfo": $scope.BankInfo,
        "References": $scope.References,
        "Relatives": $scope.Relatives,
        "Agreement": $scope.Agreement,
        "Documents": $scope.Documents
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
            switch(element.name)
            {
                case "IdentityFile":
                    $scope.Attachments.IdentityFile = files[0];
                    $scope.Documents[0].Name = files[0].name;
                    break;
                case "SsnFile":
                    $scope.Attachments.SsnFile = files[0];
                    $scope.Documents[1].Name = files[0].name;
                    break;
                case "PaystubsFile":
                    $scope.Attachments.PaystubsFile = files[0];
                    $scope.Documents[2].Name = files[0].name;
                    break;
                case "BillFile":
                    $scope.Attachments.BillFile = files[0];
                    $scope.Documents[3].Name = files[0].name;
                    break;
                default:
                    break;
            }
        }
    }

    //the current application is enabled.
    $scope.$watch('$parent.applicationsNumber', function () {
        if (formNumber == $scope.$parent.applicationsNumber - 1) {
            $scope.$parent.Applications.push($scope.Application);
            $scope.$parent.Attachments.push($scope.Attachments);
            if ($scope.$parent.curIndex > 0) {
                $scope.$parent.applicationDescription = "Application " + $scope.$parent.applicationsNumber;
            }
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
    $scope.showErrorMsg = false;
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
    $scope.Attachments = [];
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
        $scope.appDescription();
    }

    //next application
    $scope.nextApplication = function () {
        nextButtonAction($scope);
        $scope.appDescription();
    }

    $scope.appDescription = function () {
        if ($scope.curIndex == 0) {
            $scope.applicationDescription = "Main Application ";
        }
        else {
            $scope.applicationDescription = "Application " + ($scope.curIndex + 1);
        }
    }

    $scope.enableButtons = function () {
        //if ($('#premises').hasClass('green_background')) {
            $scope.disableSubmit = false;
            $scope.disableAddAnother = false;
        //}
    }

    $scope.disableAllButtons = function () {
        $("body").css("cursor", "progress");
        $scope.disableSubmit = true;
        $scope.disableBackToPrevious = true;
        $scope.disableNextApplication = true;
        $scope.disableAddAnother = true;
    }

    //submite fails
    $scope.enableButtonsForSubmitFail = function () {
        $scope.disableSubmit = false;
        if($scope.curIndex > 0) {
            $scope.disableBackToPrevious = false;
        }
        if($scope.curIndex < $scope.applicationsNumber - 1) {
            $scope.disableNextApplication = false;
        }
        if ($scope.applicationsNumber < $scope.total) {
            $scope.disableAddAnother = false;
        }
        $scope.showErrorMsg = true;
    }

    //submit
    $scope.submitForm = function () {
        $scope.disableAllButtons();
        var formData = new FormData();
        formData.append("application", JSON.stringify($scope.RentApplication));
        for (i = 0; i < $scope.Attachments.length; i++) {
            if ($scope.Attachments[i].IdentityFile != null && $scope.Attachments[i].IdentityFile.name.length > 0) {
                formData.append("IdentityFile" + i, $scope.Attachments[i].IdentityFile);
            }
            if ($scope.Attachments[i].SsnFile != null && $scope.Attachments[i].SsnFile.name.length > 0) {
                formData.append("SsnFile" + i, $scope.Attachments[i].SsnFile);
            }
            if ($scope.Attachments[i].PaystubsFile != null && $scope.Attachments[i].PaystubsFile.name.length > 0) {
                formData.append("PaystubsFile" + i, $scope.Attachments[i].PaystubsFile);
            }
            if ($scope.Attachments[i].BillFile != null && $scope.Attachments[i].BillFile.name.length > 0) {
                formData.append("BillFile" + i, $scope.Attachments[i].BillFile);
            }
        }

        $.ajax({
            type: "POST",
            url: "/api/Application",
            contentType: false,
            processData: false,
            data: formData,
            success: function (data, statusText, xhr) {
                $("body").css("cursor", "default");
                $scope.$apply(function () {
                    $scope.dialogHeader = "Success";
                    $scope.dialogMessage = 'Thank you for your interest in ' + $scope.Premises.Address + '. Your application has been sent to Rising Investments LLC already. Once you have paid the screening/credit check fees, Our staff will contact you soon.';
                });
                $('#infoDlg').modal('show');
            },
            error: function (xhr, textStatus, errorThrown) {
                $("body").css("cursor", "default");
                $('#errorMsg').html(xhr.responseText);
                //javascript call angular
                $scope.$apply(function () {
                    $scope.dialogHeader = "Failure";
                    $scope.dialogMessage = 'Unfortunatel, your application has been failed to send to Rising Investments LLC. PLease check the errors and try it again';
                    $scope.enableButtonsForSubmitFail();
                });
                $('#infoDlg').modal('show');
            }
        });
    }
});

