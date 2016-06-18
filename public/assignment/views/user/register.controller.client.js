/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);
    function RegisterController($location,$routeParams,UserService){

        var vm = this;
        var id = $routeParams.uid;
        vm.createUser = createUser;
        vm.error = false;
        
        function isUserValid(user){
            if(user.username === undefined) {
                $("#usernameInput").css("background-color", "lightcoral");
                $("#usernameInput").val("*Username Required");
            }
        }

        function createUser(user){
            if(user) {
                isUserValid(user);
                if (user.username && user.password && user.verifyPassword) {
                    if (user.password.match(user.verifyPassword)) {
                        UserService
                            .register(user)
                            .then(
                                function(response){
                                    var user = response.data;
                                    if(user._id)
                                        $location.url("/user/" + user._id);
                                    else
                                        vm.error = "Username already exists";
                                },
                                function(error){
                                    vm.error = "Username already exists";
                                });
                    }
                    else {
                        vm.error = "Verify Password failed";
                    }
                }
                else {
                    vm.error = "Could not be Registered";
                }
            }
            else {
                vm.error = "Error! Kindly fill in all the fields";
                $("#usernameInput").css("background-color", "lightcoral");
                $("#passwordInput").css("background-color", "lightcoral");
                $("#verifyPasswordInput").css("background-color", "lightcoral");

            }
        }

    }
})();