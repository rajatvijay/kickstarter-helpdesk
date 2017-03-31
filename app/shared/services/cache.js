/**
 * Created by rajat on 1/4/17.
 */

ng.module('app').provider('cache', [
  function () {
    this['$get'] = [
      function () {
        var cache = function (key, val, lifetime) {
          if (arguments.length === 1) {
            return cache.get(key);
          } else if (arguments.length === 2) {
            return cache.set(key, val);
          } else if (arguments.length === 3) {
            return cache.set(key, val, lifetime);
          }
        };

        cache._hash = {};
        // Using this, we maintain an in memory hash of objects that are
        // retrieved from localStorage. This prevents the cost of deserializing
        // objects each time they are pulled out of localStorage

        cache.set = function (key, val, lifetime) {
          delete cache._hash[key];

          var cacheObj = {
            val: val,
            lifetime: ng.isNumber(lifetime) ? lifetime : -1,
            timestamp: (new Date()).getTime()
          };

          localStorage.setItem(key, ng.toJson(cacheObj));
          return this;
        };

        cache.get = function (key) {
          if (cache._hash.hasOwnProperty(key)) {
            return ng.copy(cache._hash[key]);
          } else {
            var cacheObj = JSON.parse(localStorage.getItem(key));

            if (! cacheObj) {
              return null;
            }

            if (
              cacheObj.lifetime !== -1 &&
              ((new Date()).getTime() - cacheObj.timestamp) > cacheObj.lifetime
            ) {
              cache.remove(key);
              return null;
            } else {
              cache._hash[key] = cacheObj.val;
              return ng.copy(cacheObj.val);
            }
          }
        };

        cache.lifetime = function (lifetime) {
          return function (key, val) {
            return cache(key, val);
          };
        };

        cache.remove = function (key) {
          delete cache._hash[key];

          localStorage.removeItem(key);
          return this;
        };

        cache.flush = function () {
          cache._hash = {} ;
          localStorage.clear();
        };

        return cache;
      }
    ];
  }
]);
