/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("AdminController",AdminController);
    function AdminController($location,$routeParams, UserService,$window,ProductReviewService){

        var vm = this;
        vm.updateUser = updateUser;
        vm.error = false;
        var id = undefined;
        if($window.sessionStorage.getItem("currentUser")) {
            var id = $window.sessionStorage.getItem("currentUser");
        }
        vm.id = id;
        vm.unregister = unregister;
        vm.logout = logout;
        vm.searchUsers = searchUsers;
        vm.checkUserProfile = checkUserProfile;
        vm.approveReview = approveReview;
        vm.deleteReview = deleteReview;
        vm.error = false;

        function init(){
            if($window.sessionStorage.getItem("currentView")==="user"){
                vm.currentView = 'user';
                $window.sessionStorage.setItem("currentView","profile");
            }
            else {
                vm.currentView = 'profile';
            }
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                    if(!vm.user.pic){
                        vm.user.pic = "../project/images/profilePic.png";
                    }
                });
            getUsersOnInit();
            getReviewsOnInit();
            vm.success = false;
            vm.error = false;

        }
        init();

        function getUsersOnInit(){
            UserService
                .findUsers()
                .then(
                    function (response) {
                        var usersRet = response.data;
                        for (var i in usersRet) {
                            if (usersRet[i]._id === id) {
                                usersRet.splice(i, 1);
                            }
                        }
                        for (var i in usersRet) {
                            if (usersRet[i].pic === undefined) {
                                usersRet[i].pic = "../project/images/profilePic.png";
                            }
                        }
                        vm.users = usersRet;
                    },
                    function (error) {
                        vm.error = "Unable to access users data";
                    });
        }

        function getReviewsOnInit(){

            ProductReviewService
                .getProductReviewToReview()
                .then(
                    function(response){
                        vm.reviews = response.data;
                        vm.reviewsCount = response.data.length;
                        for(var i in vm.reviews){
                            vm.reviews[i].dateCreated = vm.reviews[i].dateCreated.split("T")[0];
                            console.log(vm.reviews[i].dateCreated);
                        }
                        console.log(vm.reviews);
                    },
                    function(error){
                        vm.error ="unable to fetch reviews";
                    });

        }

        function searchUsers(searchText) {
            UserService
                .searchUsers(searchText)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.users = response.data;
                        for(var i = 0;i<vm.users.length;i++){
                            if(!vm.users[i].pic){
                                vm.users[i].pic = "../project/images/profilePic.png";
                            }
                        }
                        if(vm.users.length===0){
                            vm.alert = "No users found";
                        }
                    },
                    function(response){
                        vm.error="Unable to search for users";
                    });
        }

        function checkUserProfile(id){
            $window.sessionStorage.setItem("currentView","user");
            $location.url("/user/delete/"+id);
        }

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

        function approveReview(reviewId){
            ProductReviewService
                .approveReview(reviewId)
                .then(
                    function(response){
                        getReviewsOnInit();
                    },
                    function(error){
                        vm.error ="unable to fetch reviews";
                    }
                )
        }

        function deleteReview(reviewId){
            ProductReviewService
                .deleteReview(reviewId)
                .then(
                    function(response){
                        getReviewsOnInit();
                    },
                    function(error){
                        vm.error ="unable to fetch reviews";
                    }
                )
        }
        
    }
})();