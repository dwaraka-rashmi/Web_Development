/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);
    function ProfileController($location,$routeParams, UserService){

        var vm = this;
        vm.updateUser = updateUser;
        vm.error = false;
        var id = $routeParams.uid;
        vm.id = id;
        vm.unregister = unregister;
        vm.logout = logout;
        vm.error = false;

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = "Unable to logout";
                    }
                );
        }

        function unregister(){
            UserService.deleteUser(id)
                .then(function(){
                        $location.url("/login");
                    },
                    function(){
                        vm.error= "Unable to remove user";
                    });
        }

        function init(){
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                })
            vm.success = false;
            vm.error = false;
        }
        init();

        function updateUser(newUser){
            UserService.updateUser(id,newUser)
                .then(
                    function(response){
                        vm.success = response;
                    },
                    function(error){
                        vm.error = error;
                    })
        }
    }
})();