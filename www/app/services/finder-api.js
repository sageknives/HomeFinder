(function() {
    'use strict';

    angular.module('HomeFinder').factory('finderApi', ['$http', '$q', '$ionicLoading', 'CacheFactory', finderApi]);

    function finderApi($http, $q, $ionicLoading, CacheFactory) {

        
        //alert("in thing");
        self.craigsDataCache;
        //self.craigsItemDataCache;

        if( ionic.Platform.isAndroid() ){
            console.log("android!");
            //for android
          if (!CacheFactory.get('finderCache')) {
            self.craigsDataCache = CacheFactory('finderCache');
          }
        }else{
            self.craigsDataCache = CacheFactory.get("finderCache"); 
            if(!self.craigsDataCache) self.craigsDataCache ={};
        }
        console.log(ionic.Platform.platform());
          // Check to make sure the cache doesn't already exist
          
        //for browser serve
        

        console.log(self.craigsDataCache);

        self.craigsDataCache.setOptions({
            onExpire: function (key, value) {
                getCraigsList()
                    .then(function () {
                        console.log("Leagues Cache was automatically refreshed.", new Date());
                    }, function () {
                        console.log("Error getting data. Putting expired item back in the cache.", new Date());
                        self.craigsDataCache.put(key, value);
                    });
            }
        });

        self.staticCache = CacheFactory.get("staticCache");

        function setCraigsListId(craigsListId){
            self.staticCache.put("currentCraigsListId", craigsListId);
        }

        function getCraigsListId(){
            var id = self.staticCache.get("currentCraigsListId");
            console.log("in get craigID", id);
            return id;
        }
        
        var x2js = new X2JS();
        function getCraigsList(refresh) {
            console.log("in get craig");
            console.log("in craig");
            var deferred = $q.defer(),
                cacheKey = "craigslist",
                craigsListData = self.craigsDataCache.get(cacheKey);

            if (craigsListData && !refresh) {
                //console.log("Found data inside cache", craigsListData);
                console.log("in craig got it");
                deferred.resolve(craigsListData);
            } else {
                $http.get('http://seattle.craigslist.org/search/see/hhh?format=rss&query=(ballard|fremont|wallingford|phinney|greenwood|nw|98107|98117|98103|98113|98109)-"capitol hill"-"central district"-"no pets"-"no cats"-"no dogs"&max_price=1700&excats=2-16-1-20-1-1-17-41-2&sort=date&minSqft=600')
                    .success(function(data) {
                        console.log("in craig getting it");
                        console.log("Received data via HTTP");
                        data = JSON.parse(JSON.stringify(x2js.xml_str2json(data)));
                        console.log(data.RDF.item);
                        self.craigsDataCache.put(cacheKey, data.RDF.item);
                        deferred.resolve(data.RDF.item);
                    })
                    .error(function(error) {
                        alert(error);
                        alert("in craig fail");
                        console.log("Error while making HTTP call.");
                        deferred.reject();
                    });
            }
            return deferred.promise;
        };

        return {
            getCraigsList: getCraigsList,
            getCraigsListId: getCraigsListId,
            setCraigsListId: setCraigsListId
        };
    };
})();