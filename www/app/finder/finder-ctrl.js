(function () {
    'use strict';

    angular.module('HomeFinder').controller('HomeCtrl', ['$scope','$ionicPopup', 'finderApi',HomeCtrl]);

    function HomeCtrl($scope, $ionicPopup, finderApi) {
        console.log("in home");
        var vm = this;

        vm.openUrl = function(url){
            console.log("open:" +  url);
            window.open(url, "_blank", "location=yes");
            return false; 
        };
        finderApi.getCraigsList().then(function(data){
            console.log("in homefinder after then");
            vm.craigslist = data;
        });

        vm.selectListing = function(id){
            finderApi.setCraigsListId(id);
            $state.go("app.listing");
        }
 
        vm.cleanInput = function(input){
            input = input.replace("&#x0024;","$");
            var inputEnd = input.indexOf("<sup>");
 
            return input.substr(0,inputEnd);
        }

        vm.loadList = function(forceRefresh) {
        console.log("in reload list on home");
        if(forceRefresh) console.log("true refresh");
        else console.log("false refresh");
            finderApi.getCraigsList(forceRefresh).then(function(data) {
                console.log("in reload list on home after then");
                vm.craigslist = data;
            }).finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };



        //vm.loadList(false);
    };
})();