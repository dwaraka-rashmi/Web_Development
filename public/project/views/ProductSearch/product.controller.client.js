/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductController",ProductController);

    function ProductController($location,$routeParams,ProductService,$window,ProductSearchService,UserService) {

        var vm = this;
        var itemId = $routeParams.pid;
        var userId = null;
        if(!$window.sessionStorage.getItem("currentUser")) {
            userId = $window.sessionStorage.getItem("currentUser");
        }

        function init(){
            ProductSearchService
                .getProductById(itemId)
                .then(function(response){
                        var item = response.data;
                        vm.item = item;
                        console.log(item);
                        updateUserPreference(itemId);
                    },
                    function(error){
                        vm.error="Unable to access Walmart";
                    });
        }
        init();

        function updateUserPreference(itemId){
            ProductSearchService
                .getProductLocal(itemId)
                .then(
                    function(response){
                        var item = response.data;
                        if(item)
                        {
                            if(userId){
                                item.Users.push(userId);
                                ProductSearchService
                                        .updateProduct(item)
                                        .then(function(response){
                                                vm.success = "user prefernce saved";
                                                updateUserProductPreference(item._id);
                                            },
                                            function(error){
                                                vm.error = "Unable to update user preference";
                                            });
                            }
                            else {
                                vm.error = "user not logged In";
                            }
                        }
                        else {
                            if(userId) {
                                var item = {
                                    itemId : itemId,
                                    productName: vm.item.name,
                                    Users : [userId]
                                };
                                ProductSearchService
                                    .createProduct(item)
                                    .then(function(response){
                                            vm.success = "user prefernce saved";
                                            updateUserProductPreference(item._id);
                                        },
                                        function(error){
                                            vm.error = "Unable to update user preference";
                                        });
                            }
                            else {
                                vm.error = "user not logged In";
                            }
                        }
                    },
                    function(error){
                        vm.error = "Unable to update user preference";
                    }
                )

        }

        function updateUserProductPreference(productId){
            
            UserService
                .findUserById(userId)
                .then(
                    function(response){
                        var user = response.data;
                        user.productsSaved.push(productId);
                        UserService
                            .updateUser(user._id,user)
                            .then(
                                function(response){
                                    vm.success = "user updated";
                                },
                                function(error){
                                    vm.error = "user not updated";
                                });
                    },
                    function(error){
                        vm.error = "user not updated";
                    });
        }
    }

})();
