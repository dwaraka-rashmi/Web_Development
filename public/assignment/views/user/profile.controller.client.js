/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);
    function ProfileController($routeParams, UserService){
        var vm = this;
        vm.updateUser = updateUser;
      
        var id = $routeParams.uid;
        vm.id = id;
        function init(){
            vm.user = UserService.findUserById(id);
        }
        init();

        function updateUser(newUser){
            UserService.updateUser(id,newUser);
        }
    }
})();