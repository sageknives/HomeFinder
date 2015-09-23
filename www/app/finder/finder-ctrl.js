(function () {
    'use strict';

    angular.module('HomeFinder').controller('HomeCtrl', ['$scope', 'finderApi',HomeCtrl]);

    function HomeCtrl($scope, finderApi) {
        console.log("in home");
        var vm = this;
        /*$scope.craigslist = [
            {
                link:"http://google.com"
            },
            {
                link:"http://bing.com"
            },
            {
                link:"http://sagegatzke.com"
            },

        ];*/

        vm.openUrl = function(url){
            console.log("open:" +  url);
            window.open(url, "_blank", "location=yes");
            return false; 
        };
        finderApi.getCraigsList().then(function(data){
            vm.craigslist = data;
        });

        vm.selectListing = function(id){
            finderApi.setCraigsListId(id);
            $state.go("app.listing");
        }

        vm.loadList = function(forceRefresh) {
            finderApi.getCraigsList(forceRefresh).then(function(data) {
                vm.craigslist = data;
            }).finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };



        vm.loadList(false);
    };
})();