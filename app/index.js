/**
 * Created by rajat on 31/3/17.
 * Sets up the entire app, with config
 **/

'use strict';

window.ng = window.angular;

var _dependencies = ['ngMaterial', 'ngRoute', 'angular-loading-bar'];

var app = ng.module('app', _dependencies);

app.run(['$rootScope', '$location', function ($rootScope) {

  var _default = 'Home';

  $rootScope.$on('$routeChangeSuccess', function (event, current) {

    if (current.locals && current.locals.hasOwnProperty('currentSection')
      && current.locals.currentSection.hasOwnProperty('title')) {
      $rootScope.title = current.locals.currentSection.title || _default;
      return;
    }

    $rootScope.title = current.$$route.title || _default;

  });
}]);

app.controller('baseController', ['$scope', function ($scope) {

  console.log('base controller called!');

  // Base Functions

  }]
);
