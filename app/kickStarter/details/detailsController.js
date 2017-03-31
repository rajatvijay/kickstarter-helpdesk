/**
 * Created by rajat on 1/4/17.
 */

app.controller('detailsController', ['$scope', 'projectService',
  function ($scope, projectService) {

    $scope.project = projectService.getDetailedProject();

    $scope.viewProject = function (project) {
      projectService.viewProject(project);
    };

  }]);