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
        vm.user = null;


        function createUser(username,password,verifyPassword){

            if(password.match(verifyPassword)){
                vm.user = UserService.createUser(username,password);
            }
            if(vm.user){
                $location.url("/user/"+vm.user._id);
            }
            else {
                vm.error = "Could not be Registered";
            }

        }
    }
})();