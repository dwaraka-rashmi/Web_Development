/**
 * Created by Rashmi_Dwaraka on 6/21/2016.
 */
(function(){
    angular
        .module("BestShop")
        .factory("ProductService", ProductService);

    function ProductService($http) {
        
        var api = {
            updateProduct:updateProduct
        };
        return api;

        function updateProduct(item){
            var url = "/api/product/"
            return $http.put(url,item);
        }

    }
})();
