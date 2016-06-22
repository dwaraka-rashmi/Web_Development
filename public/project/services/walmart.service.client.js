/**
 * Created by Rashmi_Dwaraka on 6/18/2016.
 */
(function(){
    angular
        .module("BestShop")
        .factory("ProductSearchService", ProductSearchService);

    var key = "y9sfyhfq8wxk69hhy3xcqsj9";
    var secret = "tmqqje26ukhp3hvn63g247t6";
    // var urlBase = "https://api.walmartlabs.com/v1/items/12417832?apiKey=y9sfyhfq8wxk69hhy3xcqsj9&format=json&callback=JSON_CALLBACK";
    // var urlTaxonomy = "https://api.walmartlabs.com/v1/taxonomy?apiKey=y9sfyhfq8wxk69hhy3xcqsj9"
    // var urlBase = "http://api.walmartlabs.com/v1/items/12417832?apiKey=y9sfyhfq8wxk69hhy3xcqsj9.jsonp";
    // var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function ProductSearchService($http) {
        var api = {
            searchProducts: searchProducts,
            getDeals:getDeals,
            getProductById:getProductById
            // getCategory:getCategory
        };
        return api;

        function getDeals(){
            // var url = "http://api.walmartlabs.com/v1/search?query=deals"+
            //     "&format=json&apiKey=y9sfyhfq8wxk69hhy3xcqsj9&callback=JSON_CALLBACK";
            var url = "http://api.walmartlabs.com/v1/search?query=deals+value+discount+clearance&format=json&apiKey=y9sfyhfq8wxk69hhy3xcqsj9&callback=JSON_CALLBACK";
            // var url = "http://api.walmartlabs.com/v1/vod?format=json&apiKey=y9sfyhfq8wxk69hhy3xcqsj9&callback=JSON_CALLBACK";
            // var url = "http://api.walmartlabs.com/v1/vod?format=json&apiKey=y9sfyhfq8wxk69hhy3xcqsj9";
            return $http.jsonp(url);
            //     return $http.get(url);
        }
        
        function searchProducts(searchTerm) {
            var url = "http://api.walmartlabs.com/v1/search?query="+searchTerm+
                       "&format=json&apiKey=y9sfyhfq8wxk69hhy3xcqsj9&callback=JSON_CALLBACK";
            // var url="http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=RashmiDw-WebDev20-PRD-64d8cb72c-53002592&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=&keywords=harry%20potter%20phoenix&format=json" +
            //     "&callback=JSON_CALLBACK";
            return $http.jsonp(url);
        }

        function getProductById(itemId){

            var url = "http://api.walmartlabs.com/v1/items/"+itemId+
                        "?apiKey=y9sfyhfq8wxk69hhy3xcqsj9&format=json&callback=JSON_CALLBACK";
            return $http.jsonp(url);

        }

        // function getCategory(){
        //     // // var urlTaxonomy = "http://api.walmartlabs.com/v1/taxonomy?format=json&apiKey=y9sfyhfq8wxk69hhy3xcqsj9";
        //     // var urlTaxonomy = "https://api.walmartlabs.com/v1/taxonomy?" +
        //     //     "callback=angular.callbacks._1&apiKey=y9sfyhfq8wxk69hhy3xcqsj9";
        //     // return $http.jsonp(urlTaxonomy);
        //     return $http.get("http://api.walmartlabs.com/v1/taxonomy?format=json&apiKey=y9sfyhfq8wxk69hhy3xcqsj9");
        //
        // }

    }
})();
