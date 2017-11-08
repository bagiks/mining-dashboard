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
    //
    // $scope.items = []
    //
    // $scope.checkedIndex = 0
    // $scope.total = 0.0
    // $scope.laborCost = 0.0
    // $scope.materialCost = 0.0
    // $scope.spinneractive = false
    //
    // $scope.picFile = "http://placehold.it/300x300"
    //
    // $scope.selectItem = function (index) {
    //     $scope.checkedIndex = index
    //     calculateTotal()
    // }
    //
    // function calculateTotal() {
    //     $scope.materialCost = parseFloat($scope.items[$scope.checkedIndex].price.replace(",", ".")) * $scope.quantity
    //     $scope.laborCost = 30 + $scope.quantity * 5
    //     $scope.total =  parseFloat($scope.materialCost + $scope.laborCost).toFixed(2)
    // }
    //
    // $scope.checkIndex = function (index) {
    //     return $scope.checkedIndex == index
    // }
    //
    // $scope.itemClass = function (index) {
    //     if ($scope.checkedIndex == index)
    //         return "material-class"
    //     else ""
    // }
    //
    // $scope.quantity = 0
    //
    // $scope.incQuantity = function () {
    //     $scope.quantity = $scope.quantity + 1
    //     calculateTotal()
    //
    // }
    //
    // $scope.decQuantity = function () {
    //     $scope.quantity = $scope.quantity  - 1
    //     calculateTotal()
    // }
    //
    //
    // $scope.uploadPic = function (file) {
    //     if(!$scope.spinneractive){
    //         usSpinnerService.spin("spinner");
    //     }
    //     $scope.file = file
    //     file.upload = Upload.upload({
    //         url: 'http://208.101.40.246:8888/upload',  //http://demo7177.cloudapp.net/upload
    //         data: {file: file}
    //     })
    //     file.upload.then(function (response) {
    //         $timeout(function () {
    //             $scope.item = response.data
    //             console.log($scope.item)
    //             if(!$scope.spinneractive){
    //                 usSpinnerService.stop("spinner");
    //             }
    //
    //             // $scope.items = $scope.items.sort(function (a, b) {
    //             //     return a.score > b.score
    //             // }).slice(0,5)
    //         })
    //     })
    // }
    // // spinner
    


}
