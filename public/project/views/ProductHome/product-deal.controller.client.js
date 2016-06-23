/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductDealController",ProductDealController);

    function ProductDealController($location,$routeParams,$rootScope,ProductService,ProductSearchService,$http) {

        var vm = this;
        var itemId = $routeParams.pid;
        vm.alert = false;
        function init(){
            ProductSearchService
                .getProductById(itemId)
                .then(
                    function(response){
                        var item = response.data;
                        vm.item = item;
                        console.log(item);
                        if(!$rootScope.currentUser) {
                            vm.alert = "Login to continue..";
                        }
                    },
                    function(error){
                        vm.error="Unable to access Walmart";
                    });
        }
        init();

    }

})();
