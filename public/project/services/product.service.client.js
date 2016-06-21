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

        function updateProduct(userId){
            var url = "/api/product/"+userId;
            return $http.put(url,newUser);
        }

    }
})();
