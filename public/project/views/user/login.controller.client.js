/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("LoginController",LoginController);
    function LoginController($location,UserService,$window){

        var vm = this;
        vm.error = false;
        vm.login = function(username,password) {
            if (username === undefined && password === undefined)
                vm.error = "Kindly enter Username and Password";
            else {
                // .findUserByCredentials(username, password)
                UserService
                    .login(username, password)
                    .then(function (response) {
                            console.log(response.data);
                            var user = response.data;
                            if (user) {
                                $window.sessionStorage.setItem("currentUser",user._id);
                                if(user.username==="admin" && user.isAdmin){
                                    $location.url("/admin");
                                }
                                else {
                                    // $location.url("/user/" + user._id);
                                    // $location.url("/user");
                                    $location.url("/");
                                }
                            }
                            else {
                                vm.error = "user not found";
                            }
                        },
                        function (error) {
                            vm.error = "user not found";

                        });
            }
        }
    }
})();