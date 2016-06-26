/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductReviewController",ProductReviewController);

    function ProductReviewController($location,$routeParams,$window,ProductReviewService,UserService,ProductSearchService) {

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

            if(!$window.sessionStorage.getItem("currentUser")){
                vm.logAlert = true;
            }
            
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
            
            ProductSearchService
                .getProductById(itemId)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.item = response.data;
                    },
                    function(error){
                        vm.error="Unable to access Walmart";
                    });
        }
        init();

        function addReview(review,reviewTitle){
            ProductReviewService
                .createProductReview(review,itemId, vm.userId,vm.username,reviewTitle)
                .then(
                    function(response){
                        var review = response.data;
                        updateUserProductReview(review._id);
                        $("#review-text-area").val('');
                        $("#reviewTitle").val('');
                    },
                    function(error){
                        vm.error = "Unable to add the review. Try again later.";
                        $("#review-text-area").val('');
                        $("#reviewTitle").val('');
                    });
        }
        
        function updateReview(reviewId,review,reviewTitle){
            ProductReviewService
                .updateProductReview(reviewId,review,itemId, vm.userId,vm.username,reviewTitle)
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
                        $window.sessionStorage.clear();
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = "Unable to logout";
                    });
        }
        
    }


})();
