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

        vm.categories = [
            {text: "Father's Day Savings"},
            {text:"Electronics & Office"},
            {text:"Movies, Music & Books"},
            {text:"Home, Furniture & Patio"},
            {text:"Home Improvement"},
            {text:"Clothing, Shoes & Jewelry"},
            {text:"Baby & Toddler"},
            {text:"Toys & Video Games"},
            {text:"Food, Household & Pets"},
            {text:"Health, Beauty & Pharmacy"},
            {text:"Sports, Fitness & Outdoors"},
            {text:"Auto & Tires"},
            {text:"Photo, Gifts & Personalized Shop"},
            {text:"Crafts & Party Supplies"}];
        vm.search = false;
        if($window.sessionStorage.getItem("currentUser")) {
            var userId = $window.sessionStorage.getItem("currentUser");
        }
        function searchProducts(searchText) {
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
                        vm.error="Unable to search Flickr";
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

