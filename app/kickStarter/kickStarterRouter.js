/**
 * Created by rajat on 1/4/17.
 */

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'kickStarterBaseController',
        templateUrl: '/kickStarter/base.html',
        title: 'Home',
        resolve: {
          currentSectionTemplate: function () {
            return 'list/listTemplate.html';
          }
        }
      })
      .when('/project/details', {
        controller: 'kickStarterBaseController',
        templateUrl: '/kickStarter/base.html',
        title: 'Details',
        resolve: {
          currentSectionTemplate: function () {
            return 'details/detailsTemplate.html';
          }
        }
      });
    $locationProvider.html5Mode({
      enabled: true
    });
  }
]);
