/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductController",ProductController);

    function ProductController($location,$routeParams,ProductService,ProductSearchService) {

        var vm = this;
        var itemId = $routeParams.pid;

        function init(){
            ProductSearchService
                .getProductById(itemId)
                .then(
                    function(response){
                        var item = response.data;
                        vm.item = item;
                        console.log(item);
                        ProductService
                            .updateProduct(item)
                            .then(
                                function(response){
                                    var productId = response.data.id;
                                    $location.url("/product/"+productId);
                                },
                                function(error){
                                    vm.error="Unable to update DB";
                                });
                    },
                    function(error){
                        vm.error="Unable to access Walmart";
                    });
        }
        init();
        

    }

})();
