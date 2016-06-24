/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductReviewController",ProductReviewController);

    function ProductReviewController($location,$routeParams,$window,ProductReviewService,UserService) {

        var vm = this;
        var itemId = $routeParams.pid;
        vm.addReview = addReview;
        vm.updateReview = updateReview;
        
        if($window.sessionStorage.getItem("currentUser")) {
            vm.userId = $window.sessionStorage.getItem("currentUser");
            vm.username = $window.sessionStorage.getItem("currentUsername");
        }
        else
        {
            vm.alert = true;
            vm.url="#/product/"+itemId+"/review";
            $("#review-text-area").attr("disabled","disabled");
            $("#review-button").attr("disabled","disabled");
        }

        function init(){
            //upate on fetching data from db abd update product to db
            ProductReviewService
                .getProductReviewByItemId(itemId)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.items = response.data;
                    },
                    function(error){
                        vm.error="Unable to access Walmart";
                    });
        }
        init();

        function addReview(review){
            ProductReviewService
                .createProductReview(review,itemId, vm.userId,vm.username)
                .then(
                    function(response){
                        var review = response.data;
                        updateUserProductReview(review._id);
                    },
                    function(error){
                        vm.error = "Unable to add the review. Try again later."
                    });
        }
        
        function updateReview(reviewId,review){
            ProductReviewService
                .updateProductReview(reviewId,review,itemId, vm.userId,vm.username)
                .then(
                    function(response){
                        init();
                    },
                    function(error){
                        vm.error = "Unable to add the review. Try again later."
                    });
        }

        function updateUserProductReview(ReviewId){

            UserService
                .findUserById(vm.userId)
                .then(
                    function(response){
                        var user = response.data;
                        user.Reviews.push(ReviewId);
                        UserService
                            .updateUser(user._id,user)
                            .then(
                                function(response){
                                    vm.success = "user updated";
                                    init();
                                },
                                function(error){
                                    vm.error = "user not updated";
                                });
                    },
                    function(error){
                        vm.error = "user not updated";
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
