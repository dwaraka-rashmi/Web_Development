/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductReviewController",ProductReviewController);

    function ProductReviewController($location,$routeParams,$window,ProductService,UserService) {

        var vm = this;
        var itemId = $routeParams.pid;
        vm.addReview = addReview;
        vm.updateReview = updateReview;
        
        if($window.sessionStorage.getItem("currentUser")) {
            vm.userId = $window.sessionStorage.getItem("currentUser");
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
            ProductService
                .getProductReviewByItemId(itemId)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.items = [response.data];
                    },
                    function(error){
                        vm.error="Unable to access Walmart";
                    });
        }
        init();

        function addReview(review){
            ProductService
                .createProductReview(review,itemId, vm.userId)
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
            ProductService
                .updateProductReview(reviewId,review,itemId, vm.userId)
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
    }

})();
