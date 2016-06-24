/**
 * Created by Rashmi_Dwaraka on 6/18/2016.
 */
(function(){
    angular
        .module("BestShop")
        .factory("ProductSearchService", ProductSearchService);
    
    function ProductSearchService($http) {
        var api = {
            searchProducts: searchProducts,
            getDeals:getDeals,
            getProductById:getProductById,
            createProduct : createProduct,
            getProductLocal:getProductLocal,
            updateProduct:updateProduct
        };
        return api;

        function getDeals(){
            var url = "http://api.walmartlabs.com/v1/search?query=deals+value+discount+clearance" +
                "&format=json&apiKey=y9sfyhfq8wxk69hhy3xcqsj9&callback=JSON_CALLBACK";
            return $http.jsonp(url);
        }
        
        function searchProducts(searchTerm) {
            var url = "http://api.walmartlabs.com/v1/search?query="+searchTerm+
                       "&format=json&apiKey=y9sfyhfq8wxk69hhy3xcqsj9&callback=JSON_CALLBACK";
            return $http.jsonp(url);
        }

        function getProductById(itemId){
            var url = "http://api.walmartlabs.com/v1/items/"+itemId+
                        "?apiKey=y9sfyhfq8wxk69hhy3xcqsj9&format=json&callback=JSON_CALLBACK";
            return $http.jsonp(url);
        }
        
        function getProductLocal(itemId){
            var url = "/api/product/"+itemId;
            return $http.get(url);
        }

        function updateProduct(item){
            var url = "/api/product/";
            return $http.put(url,item);
        }
        
        function createProduct(item){
            var url = "/api/product/";
            return $http.post(url,item);
        }


    }
})();
