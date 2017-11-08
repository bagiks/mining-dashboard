'use strict';

angular
    .module('myApp')
    .controller('MainCtr', ['$scope','Item', '$timeout', '$http', MainCtr])


function MainCtr($scope, Item, $timeout, $http){
    
    
    $scope.workers = []
    
    $scope.loadData = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:5000/upload',
            params: {
                method: 'stats.provider.workers',
                addr: '1DHeNm1zZVpWj4DkYeQNaPCaEKqe1qPCK6',
                algo: 1
            },
            dataType: 'json',
            headers: {
                'Content-Type': "application/json"
            }
        }).then(function successCallback(response) {
            $scope.workers = response.data
        }, function errorCallback(response) {
            console.log(response)
        });
    }

    $scope.addUser = function () {
        
    }


    $scope.intervalFunction = function(){
        $timeout(function() {
          $scope.loadData();
          $scope.intervalFunction();
        }, 5000)
      };

      // Kick off the interval
      $scope.intervalFunction();

}
