/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("UserProfileController",UserProfileController);
    function UserProfileController($location,$routeParams, UserService,$window){

        var vm = this;
        vm.error = false;
        var userId = $routeParams.uid;
        var id = undefined;
        if($window.sessionStorage.getItem("currentUser")) {
            var id = $window.sessionStorage.getItem("currentUser");
        }
        vm.id = id;
        var loggedUserId = id;
        vm.id = loggedUserId;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;
        vm.error = false;
        vm.followed = false;

        function init(){
            UserService
                .findUserById(userId)
                .then(function(response){
                    vm.user = response.data;
                    var followedBy = vm.user.followedBy;
                    for(var i = 0; i < followedBy.length; i++)
                    {
                        if(followedBy[i] == loggedUserId)
                        {
                            vm.followed = true;
                        }
                    }
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
                        vm.followed = true;
                        init();
                    },
                    function(error){
                        vm.error = error;
                    });
        }

        function unfollowUser(){
            UserService
                .unfollowUser(loggedUserId,userId)
                .then(
                    function(response){
                        vm.followed = false;
                        init();
                    },
                    function(error){
                        vm.error = error;
                    });
        }
        
    }
})();