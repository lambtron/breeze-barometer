'use strict';

barometer.controller('setupController',
  ['$scope', '$http',
  function ($scope, $http)
{
  var query = $scope.query = {
    start: '',
    end: '',
    startIsValid: true,
    endIsValid: true,
    submit: function submit() {
      // transform start and end to milliseconds
      // updated_at
      var load = {
        start: this.start,
        end: this.end
      };
      $http.post('/api/funnel', {load: load})
      .success(function(data) {
        console.log(data);
      });
    }
  };
}]);