/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductHomeController",ProductHomeController);

    function ProductHomeController($location,$window,ProductSearchService,UserService){

        var vm = this;
        var getProduct = getProduct;

        var userId;
        vm.logAlert = true;
        if($window.sessionStorage.getItem("currentUser")) {
            if ($window.sessionStorage.getItem("currentUser") !== '0') {
                vm.logAlert = false;
                userId = $window.sessionStorage.getItem("currentUser");
            }
        }

        function init() {
            ProductSearchService
                .getDeals()
                .then(
                    function(response){
                        console.log(response.data);
                        vm.items= response.data.items;
                    },
                    function(response){
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
