/**
 * Created by rajat on 31/3/17.
 */

app.controller('listController', ['$scope', 'projectService', '$window', '$location',
  function ($scope, projectService, $window, $location) {

    projectService.detailedProject = null;

    projectService.getProjects().then(function (response) {

      $scope.projects = response;

    }).catch(function (error) {

      $scope.showToast('Please try again later!', 'top');
      console.log(error);
    });

    $scope.getDaysFromTodayText = function (project) {
      var today = new Date();
      var oneDay = 1000 * 60 * 60 * 24;
      var days = Math.round((new Date(project['end.time']).getTime() - today.getTime()) / oneDay);

      return days > 0 ? (parseInt(days) + ' remaining') : (days * (-1) + ' passed since campaign ended');
    };

    $scope.changeSorting = function (sortByParam, sortReverse) {
      $scope.projects.sort(function (a, b) {
        if (sortReverse) {
          return a[sortByParam] > b[sortByParam]
        } else {
          return a[sortByParam] < b[sortByParam]
        }
      })
    };

    $scope.viewProject = function (project) {
      projectService.viewProject(project);
    };

    $scope.showDetails = function (project) {
      projectService.setDetailedProject(project);
      $location.path('/project/details');
    }

  }]);