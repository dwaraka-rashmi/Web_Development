/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductDealController",ProductDealController);

    function ProductDealController($location,$routeParams,$window,ProductSearchService,UserService) {

        var vm = this;
        var itemId = $routeParams.pid;
        vm.alert = false;
        function init(){

            if(!$window.sessionStorage.getItem("currentUser")){
                vm.logAlert = true;
            }

            ProductSearchService
                .getProductById(itemId)
                .then(
                    function(response){
                        var item = response.data;
                        vm.item = item;
                        console.log(item);
                        if(!$window.sessionStorage.getItem("currentUser")) {
                            vm.alert = "Login to continue..";
                        }
                    },
                    function(error){
                        vm.error="Unable to access Walmart";
                    });
        }
        init();

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

    }

})();
