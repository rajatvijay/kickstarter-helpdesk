/**
 * Created by rajat on 1/4/17.
 */

app.config([ '$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'kickStarterBaseController',
        templateUrl: '/kickStarter/base.html',
        title: 'Home',
        resolve: {
          currentSectionTemplate: function () {
            return 'home/homeTemplate.html';
          }
        }
      });
    $locationProvider.html5Mode({
      enabled: true
    });
  }
]);
