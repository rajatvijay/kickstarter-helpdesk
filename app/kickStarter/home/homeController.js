/**
 * Created by rajat on 31/3/17.
 */

app.controller('homeController', ['$scope', 'api', function ($scope, api) {

  console.log('home controller called!');


  api.get('kickstarter').then(function (response) {
    console.log(response)
  }).catch(function (error) {
    console.log(error);
  })
}]);