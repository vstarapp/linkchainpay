/**
 * 異步請求攔截器
 * **/
module.exports = [
  "$q",
  "$rootScope",
  "$state",
  "$window",
  ($q,$rootScope, $state, $window) => {
    return {
      request: function(config) {
        $rootScope.loading = true;
        return config;
      },
      requestError: function(request) {
        $rootScope.loading = false;
        return $q.reject(request);
      },
      response: function(config) {
        $rootScope.loading = false;
        return config;
      },
      responseError: function(response) {
        $rootScope.loading = false;
        if (501 === response.status) {
        } else if (502 === response.status) {
        } else if (503 === response.status) {
        } else if (504 === response.status) {
        }
        return $q.reject(response);
      }
    };
  }
];
