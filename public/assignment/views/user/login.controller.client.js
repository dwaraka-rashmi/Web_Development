/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);
    function LoginController($location,UserService){

        var vm = this;
        vm.error = false;
        vm.login = function(username,password){
            var newUser = UserService.findUserByCredentials(username,password);
            //console.log(newUser);
            if(newUser){
                $location.url("/user/"+newUser._id);
            }
            else {
                vm.error = "user not found";
            }
        }
    }
})();