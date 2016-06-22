/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductReviewController",ProductReviewController);

    function ProductReviewController($location,$routeParams,$rootScope,ProductService,ProductSearchService) {

        var vm = this;
        var itemId = $routeParams.pid;

        if($rootScope.currentUser) {
            vm.userId = $rootScope.currentUser._id;
        }

        function init(){
            ProductSearchService
                .getProductById(itemId)
                .then(
                    function(response){
                        
                    },
                    function(error){
                        vm.error="Unable to access Walmart";
                    });
        }
        init();

    }

})();
