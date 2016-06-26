/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductSearchController",ProductSearchController);

    function ProductSearchController($location,$window,ProductSearchService,UserService) {
        var vm = this;
        vm.searchProducts = searchProducts;

        vm.search = false;
        if($window.sessionStorage.getItem("currentUser")) {
            var userId = $window.sessionStorage.getItem("currentUser");
        }
        
        function init(){
            var searchText = $window.sessionStorage.getItem("productSearch");
            if(searchText){
                vm.searchText=searchText;
                ProductSearchService
                    .searchProducts(searchText)
                    .then(
                        function(response){
                            console.log(response.data);
                            vm.search = true;
                            vm.term = response.data.query;
                            vm.totalResults = response.data.totalResults;
                            vm.items= response.data.items;
                        },
                        function(response){
                            vm.error="Unable to search Walmart";
                        });
            }
        }
        
        init();
        
        function searchProducts(searchText) {
            $window.sessionStorage.setItem("productSearch",searchText);
            ProductSearchService
                .searchProducts(searchText)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.search = true;
                        vm.term = response.data.query;
                        vm.totalResults = response.data.totalResults;
                        vm.items= response.data.items;
                    },
                    function(response){
                        vm.error="Unable to search Walmart";
                    });
        }

        vm.logout = logout;

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $window.sessionStorage.setItem("currentUser",'0');
                        $window.sessionStorage.setItem("currentUsername",'0');
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = "Unable to logout";
                    });
        }


    }
})();

