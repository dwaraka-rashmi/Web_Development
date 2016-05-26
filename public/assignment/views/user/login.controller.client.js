/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);
    function LoginController($location,UserService){
    //function LoginController($scope){
        //using $scope is bad practice
        //refer https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md
        //$scope.login = function(){
        //    console.log($scope.username);
        //}
        var vm = this;

        vm.login = function(username,password){
            var newUser = UserService.findUserByCredentials(username,password);
            console.log(newUser);
            if(newUser){
                $location.url("/user/"+newUser._id);
            }
            else
            {
                vm.error = "user not found";
            }
        }
    }
})();