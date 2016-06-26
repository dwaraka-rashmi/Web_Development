/**
 * Created by Rashmi_Dwaraka on 6/21/2016.
 */
(function(){
    angular
        .module("BestShop")
        .factory("ProductReviewService", ProductReviewService);

    function ProductReviewService($http) {
        
        var api = {
            getProductReviewByItemId:getProductReviewByItemId,
            updateProductReview:updateProductReview,
            createProductReview:createProductReview,
            getProductReviewToReview:getProductReviewToReview,
            approveReview:approveReview
        };
        return api;
        
        function getProductReviewByItemId(itemId){
            var url = "/api/product/review/"+itemId;
            return $http.get(url);
        }
        
        function getProductReviewToReview(){
            var url = "/api/product/review/all/toReview";
            return $http.get(url);
        }
        
        function updateProductReview(reviewId,review,itemId,userId,username,reviewTitle){
            var url = "/api/product/review/"+reviewId;
            var ProductReview = {
                review : review,
                reviewTitle:reviewTitle,
                itemId : itemId,
                userId: userId,
                username:username
            };
            return $http.put(url,ProductReview);
        }
        
        function approveReview(reviewId){
            var url = "/api/product/review/approve/"+reviewId;
            return $http.put(url);
        }

        function createProductReview(review,itemId,userId,username,reviewTitle){
            var url = "/api/product/review/";
            var ProductReview = {
                review : review,
                reviewTitle:reviewTitle,
                itemId : itemId,
                userId: userId,
                username:username,
                isReviewed: false
            };
            return $http.post(url,ProductReview);
        }
        
    }
})();
