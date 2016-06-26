/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProfileController",ProfileController);
    function ProfileController($location,$routeParams, UserService,$window){

        var vm = this;
        vm.updateUser = updateUser;
        vm.error = false;
        // var id = $routeParams.uid;
        var id = undefined;
        if($window.sessionStorage.getItem("currentUser")) {
            var id = $window.sessionStorage.getItem("currentUser");
        }
        vm.id = id;
        vm.unregister = unregister;
        vm.logout = logout;
        vm.error = false;

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
                    if(!vm.user.pic){
                        vm.user.pic = "../project/images/profilePic.png";
                    }
                });
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
                    });
        }
    }
})();