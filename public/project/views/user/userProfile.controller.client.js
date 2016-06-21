/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("UserProfileController",UserProfileController);
    function UserProfileController($location,$routeParams, UserService,$rootScope){

        var vm = this;
        vm.error = false;
        var userId = $routeParams.uid;
        var loggedUserId = $rootScope.currentUser._id;
        vm.id = loggedUserId;
        vm.followUser = followUser;
        vm.error = false;

        function init(){
            UserService
                .findUserById(userId)
                .then(function(response){
                    vm.user = response.data;
                });
            vm.success = false;
            vm.error = false;
        }
        init();

        function followUser(){
            UserService
                .followUser(loggedUserId,userId)
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