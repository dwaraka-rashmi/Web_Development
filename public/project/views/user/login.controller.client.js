/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("LoginController",LoginController);
    function LoginController($location,UserService){

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
                                $location.url("/user/" + user._id);
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