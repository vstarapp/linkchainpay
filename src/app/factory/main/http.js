const config = require('../../../config')
const BASE_URL = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev;
/**
 * 異步請求
 * **/
module.exports = [
  "$http",
  "$q",
  ($http, $q) => {
    return {
      post: function(url, data) {
        var defer = $q.defer();
        $http({
          method: "post",
          url: BASE_URL + url,
          data: data,
          contentType: "application/x-www-form-urlencoded"
        })
          .then(function(result, status, headers, config) {
            defer.resolve(result, status, headers, config);
          })
          .catch(function(result, status, headers, config) {
            defer.reject(result, status, headers, config);
          });
        return defer.promise;
      },
      get: function(url, data) {
        var defer = $q.defer();
        var str = "";
        if (angular.isObject(data)) {
          angular.forEach(data, function(value, param) {
            str =
              str || url.indexOf("?") >= 0
                ? str + "&" + param + "=" + value
                : "?" + param + "=" + value;
          });
        }
        url = BASE_URL + str;
        $http({
          method: "get",
          url: url
        })
          .then(function(result, status, headers, config) {
            defer.resolve(result, status, headers, config);
          })
          .catch(function(result, status, headers, config) {
            defer.reject(result, status, headers, config);
          });
        return defer.promise;
      }
    };
  }
];
