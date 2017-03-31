/**
 * Created by rajat on 1/4/17.
 */

app.service('projectService', ['api', 'kickStarterAPI', '$window', 'cache',
  function (api, kickStarterAPI, $window, cache) {

    this.detailedProject = null;

    this.getProjects = function () {
      return api.get(kickStarterAPI.projects);
    };

    this.viewProject = function (project) {
      $window.open('https://www.kickstarter.com/' + project.url, '_blank');
    };

    this.setDetailedProject = function (project) {
      cache('current.project', project);
      this.detailedProject = project;
    };

    this.getDetailedProject = function () {
      return this.detailedProject !== null ? this.detailedProject : cache('current.project');
    }
  }
]);
