'use strict';

angular
    .module('myApp')
    .controller('MainCtr', ['$scope','Item', '$timeout', '$http', '$location', '$window', MainCtr])


function MainCtr($scope, Item, $timeout, $http, $location, $window){
    
    
    $scope.workers = []
    $scope.user = ''
    $scope.temp_user = ''
    $scope.address = ''
    $scope.temp_address = ''
    $scope.users = []

    $scope.goToAddress = function(address, refresh) {
    if(refresh || $scope.$$phase) {
        $window.location.href = "?address="+address;
    } else {
        $location.path(url);
        $scope.$apply();
    }
}

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

    $scope.addUser = function (username, address) {

        $scope.temp_user = ''
        $scope.temp_address = ''
        console.log(username)
        $http({
            method: 'POST',
            url: 'http://localhost:5000/addUser',
            params: {
                "username": username,
                "address": address
            }
        }).then(function successCallback( response) {
            $scope.user = response.data
        })
    }

    $scope.getUsers = function () {

        $http({
            method: 'GET',
            url: 'http://localhost:5000/getUsers'
        }).then(function successCallback( response) {
            $scope.users = response.data
        })

        console.log($scope.users)
    }

    $scope.intervalFunction = function(){
        $timeout(function() {
          $scope.loadData();
          $scope.getUsers();
          $scope.intervalFunction();
        }, 5000)
      };

      // Kick off the interval
      $scope.intervalFunction();

}
