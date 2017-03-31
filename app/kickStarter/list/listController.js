/**
 * Created by rajat on 31/3/17.
 */

app.controller('listController', ['$scope', 'listService', '$window', function ($scope, listService, $window) {

  listService.getProjects().then(function (response) {

    $scope.projects = response;

  }).catch(function (error) {

    $scope.showToast('Please try again later!', 'top');
    console.log(error);
  });

  $scope.getDaysFromTodayText = function (project) {
    var today = new Date();
    var oneDay = 1000 * 60 * 60 * 24;
    var days = Math.round((new Date(project['end.time'] - today.getTime()).getTime()) / oneDay);

    console.log(days);

    console.log(parseInt(days) > 0 ? (days + ' remaining') : (days + ' passed since campaign ended'));
    return days > 0 ? (parseInt(days) + ' remaining') : (days + ' passed since campaign ended');
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
    $window.open('https://www.kickstarter.com/' + project.url, '_blank');
  };

}]);