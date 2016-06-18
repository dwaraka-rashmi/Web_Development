/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductSearchController",ProductSearchController);

    function ProductSearchController($location,$routeParams,ProductSearchService) {
        var vm = this;
        vm.searchProducts = searchProducts;
        
        function init(){
            ProductSearchService
                .getCategory()
                .then(
                    function(response){
                        vm.category = response.data;
                    },
                    function(err){
                        vm.error = "Unable to access Server";
                    }
                )
        }
        init();
        
        function searchProducts(searchText) {
            ProductSearchService
                .searchProducts(searchText)
                .then(
                    function(response){
                        console.log(response.data);
                    },
                    function(response){
                        vm.error="Unable to search Flickr";
                    });
        }
    }
})();

