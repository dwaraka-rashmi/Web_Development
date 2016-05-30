/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);
    function RegisterController($location,UserService){

        var vm = this;
        vm.createUser = createUser;
        vm.error = false;

        function createUser(user){
            if(user) {
                if (user.username && user.password && user.verifyPassword) {
                    if (user.password.match(user.verifyPassword)) {
                        vm.user = UserService.createUser(user);
                    }
                    if (vm.user) {
                        $location.url("/user/" + vm.user._id);
                    }
                    else {
                        vm.error = "Could not be Registered";
                    }
                }
            }
            else {
                vm.error = "Error! Kindly fill in all the fields";
            }

        }
    }
})();