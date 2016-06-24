/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("RegisterController",RegisterController);
    function RegisterController($location,$routeParams,UserService){

        var vm = this;
        var id = $routeParams.uid;
        vm.createUser = createUser;
        vm.error = false;

        function createUser(user){
            if(user) {
                if (user.username && user.password && user.verifyPassword) {
                    if (user.password.match(user.verifyPassword)) {
                        UserService
                            .register(user)
                            .then(
                                function(response){
                                    var user = response.data;
                                    if(user._id)
                                        $location.url("/user/");
                                    else
                                        vm.error = "Username already exists";
                                },
                                function(error){
                                    vm.error = "Username already exists";
                                });
                    }
                    else {
                        vm.error = "Could not be Registered";
                    }
                }
                else {
                    vm.error = "Could not be Registered";
                }
            }
            else {
                vm.error = "Error! Kindly fill in all the fields";
            }
        }

    }
})();