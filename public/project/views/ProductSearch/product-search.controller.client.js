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
        vm.items=[];
        vm.search = false;
        if($window.sessionStorage.getItem("currentUser")) {
            var userId = $window.sessionStorage.getItem("currentUser");
        }
        
        function init(){
            if(!$window.sessionStorage.getItem("currentUser")){
                vm.logAlert = true;
            }
            var searchText = $window.sessionStorage.getItem("productSearch");
            if(searchText){
                vm.searchText=searchText;
                searchProducts(searchText);
            }
        }
        
        init();
        
        function searchProducts(searchText) {

            if(!$window.sessionStorage.getItem("productSearch").match(searchText)){
                vm.items=[];
            }
            else {
                $window.sessionStorage.setItem("productSearch", searchText);
            }
            ProductSearchService
                .searchProducts(searchText)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.search = true;
                        vm.term = response.data.query;
                        vm.totalResults = response.data.totalResults;
                        for (var i in response.data.items){
                            vm.items.push(response.data.items[i]);
                        }

                        vm.itemCount = response.data.items.length;
                        vm.load = true;
                        // vm.items= response.data.items;
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
                        $window.sessionStorage.clear();
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = "Unable to logout";
                    });
        }

        vm.loadMore = loadMore;
        
        function loadMore(searchTerm){
            ProductSearchService
                .loadMore(vm.items.length,searchTerm)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.search = true;
                        vm.term = response.data.query;
                        vm.totalResults = response.data.totalResults;
                        for (var i in response.data.items){
                            vm.items.push(response.data.items[i]);
                        }

                        vm.itemCount = response.data.items.length;
                        vm.load = true;
                        // vm.items= response.data.items;
                    },
                    function(response){
                        vm.error="Unable to search Walmart";
                    });
            
        }

    }
})();

