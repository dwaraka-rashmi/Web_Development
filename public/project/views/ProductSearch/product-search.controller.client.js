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
    }
})();

