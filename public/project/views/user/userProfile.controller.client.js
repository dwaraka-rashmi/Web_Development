/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("UserProfileController",UserProfileController);
    function UserProfileController($location,$routeParams, UserService,$window,ProductSearchService){

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
        vm.back=back;

        function back(){
            $window.history.back();
        }


        function init(){
            vm.currentView = 'profile';
            UserService
                .findUserById(userId)
                .then(function(response){
                    vm.user = response.data;
                    var followedBy = vm.user.followedBy;
                    if(followedBy) {
                        if (followedBy.indexOf(loggedUserId) >= 0) {
                            vm.followed = true;
                        }
                    }
                    if(!vm.user.pic){
                        vm.user.pic = "../project/images/profilePic.png";
                    }
                    vm.category = [];
                    vm.products = vm.user.productsSaved;
                    fetchProductInterests();
                });
            vm.success = false;
            vm.error = false;
        }
        init();

        function fetchProductInterests(){
            if(vm.products.length>0)
            ProductSearchService
                .getProductLocal(vm.products.pop())
                .then(
                    function(response){
                        if(response.data) {
                            if (response.data.category && (vm.category.indexOf(response.data.category) < 0)) {
                                vm.category.push({
                                    "category": response.data.category,
                                    "categoryId": response.data.categoryId
                                });
                            }
                            fetchProductInterests();
                        }
                    },
                    function(error){
                        vm.error = "failed to fetch data";
                    });
        }

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

        vm.logout = logout;

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $window.sessionStorage.setItem("currentUser",'0');
                        $window.sessionStorage.setItem("currentUsername",'0');
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = "Unable to logout";
                    });
        }



    }
})();