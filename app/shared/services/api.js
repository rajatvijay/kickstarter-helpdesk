/**
 * Created by rajat on 31/3/17.
 */

ng.module('app').provider('api', [ function () {

    // declaring like this to avoid minification conflict
    this['$get'] = [
      '$http', 'BASE_URL',
      function ($http, BASE_URL) {

        var api = function (method, url, options) {

          options = ng.isObject(options) ? options : {} ;

          // Just to make the code readable
          var apiEndpoint = url;
          options.url = 'http://' + BASE_URL + '/' +  apiEndpoint;

          options.method = method;

          options.headers = options.headers || {};

          return $http(options).then(function (res) {

            return res.data;

          }, function(error) {
            console.log('ERROR OCCURRED') ;
            return error.data ;
          });
        };

        ['GET', 'PUT', 'POST', 'DELETE'].forEach(function (method) {
          api[method.toLowerCase()] = function (url, options) {
            return api(method, url, options);
          };
        });

        return api;
      }
    ];
  }
]);
