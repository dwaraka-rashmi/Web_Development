/**
 * Created by Rashmi_Dwaraka on 6/18/2016.
 */
(function(){
    angular
        .module("BestShop")
        .factory("ProductSearchService", ProductSearchService);

    var key = "y9sfyhfq8wxk69hhy3xcqsj9";
    var secret = "tmqqje26ukhp3hvn63g247t6";
    var urlBase = "https://api.walmartlabs.com/v1/items/12417832?apiKey=y9sfyhfq8wxk69hhy3xcqsj9&format=json&callback=JSON_CALLBACK";
    var urlTaxonomy = "https://api.walmartlabs.com/v1/taxonomy?apiKey=y9sfyhfq8wxk69hhy3xcqsj9&format=json&callback=JSON_CALLBACK"
    // var urlBase = "http://api.walmartlabs.com/v1/items/12417832?apiKey=y9sfyhfq8wxk69hhy3xcqsj9.jsonp";
    // var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function ProductSearchService($http) {
        var api = {
            searchProducts: searchProducts,
            getCategory:getCategory
        };
        return api;

        function getCategory(){
           return $http.jsonp(urlTaxonomy);
        }
        

        function searchProducts(searchTerm) {
            return $http.jsonp(urlBase);
        }
    }
})();
