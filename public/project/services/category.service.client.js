/**
 * Created by Rashmi_Dwaraka on 6/18/2016.
 */
(function(){
    angular
        .module("BestShop")
        .factory("CategorySearchService", CategorySearchService);
    
    function CategorySearchService($http) {
        var api = {
            searchProducts: searchProducts,
            getCategory:getCategory
            // ,
            // getProductById:getProductById,
            // createProduct : createProduct,
            // getProductLocal:getProductLocal,
            // updateProduct:updateProduct
        };
        return api;

        function getCategory(){
            var url = "/api/AllCategories";
            return $http.get(url);
        }

        function searchProducts(category,categoryId) {
            var url = "http://api.walmartlabs.com/v1/search?query="+category+
                       "&categoryId="+categoryId+"&format=json&apiKey=y9sfyhfq8wxk69hhy3xcqsj9&callback=JSON_CALLBACK";
            return $http.jsonp(url);
        }

        // function getProductById(itemId){
        //     var url = "http://api.walmartlabs.com/v1/items/"+itemId+
        //                 "?apiKey=y9sfyhfq8wxk69hhy3xcqsj9&format=json&callback=JSON_CALLBACK";
        //     return $http.jsonp(url);
        // }
        //
        // function getProductLocal(itemId){
        //     var url = "/api/product/"+itemId;
        //     return $http.get(url);
        // }
        //
        // function updateProduct(item){
        //     var url = "/api/product/";
        //     return $http.put(url,item);
        // }
        //
        // function createProduct(item){
        //     var url = "/api/product/";
        //     return $http.post(url,item);
        // }


    }
})();
