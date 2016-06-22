/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductSavedController",ProductSavedController);

    function ProductSavedController($location,$routeParams,$rootScope,ProductSearchService,User) {
        var vm = this;
        var id = $routeParams.uid;
        
        function savedProducts() {
            ProductSearchService
                .savedProducts()
                .then(
                    function(response){
                        console.log(response.data);
                        vm.items= response.data.items;
                        // if(window.innerWidth<400)
                            
                    },
                    function(response){
                        vm.error="Unable to reach Products";
                    });
        }
    }
})();

