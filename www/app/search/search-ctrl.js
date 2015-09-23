(function () {
    'use strict';

    angular.module('HomeFinder').controller('SearchCtrl', ['$scope', 'finderApi',SearchCtrl]);

    function SearchCtrl($scope, finderApi) {
        console.log("in search");
        var vm = this;
		vm.searchUrl = 'http://seattle.craigslist.org/search/see/hhh?format=rss&query=(ballard|fremont|wallingford|phinney|greenwood|nw|98107|98117|98103|98113|98109)-"capitol hill"-"central district"-"no pets"-"no cats"-"no dogs"&max_price=1700&excats=2-16-1-20-1-1-17-41-2&sort=date&minSqft=600';
    };
})();