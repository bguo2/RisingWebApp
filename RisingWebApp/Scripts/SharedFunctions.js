
function previousButtonAction($scope) {
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

function nextButtonAction($scope) {
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

function changeBlockClass(formIdName, subElement, removeClassName, addClassName)
{
    var find = $(formIdName + ' ' + subElement);
    find.removeClass(removeClassName);
    find.addClass(addClassName);
}