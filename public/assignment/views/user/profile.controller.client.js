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
            vm.success = false;
            vm.error = false;
        }
        init();

        function updateUser(newUser){
            var result = UserService.updateUser(id,newUser);
            if(result)
                vm.success = true;
            else
                vm.error = true;
        }
    }
})();