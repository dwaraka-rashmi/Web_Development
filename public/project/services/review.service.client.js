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
            createProductReview:createProductReview
        };
        return api;
        
        function getProductReviewByItemId(itemId){
            var url = "/api/product/review/"+itemId;
            return $http.get(url);
        }
        
        function updateProductReview(reviewId,review,itemId,userId,username){
            var url = "/api/product/review/"+reviewId;
            var ProductReview = {
                review : review,
                itemId : itemId,
                userId: userId,
                username:username
            };
            return $http.put(url,ProductReview);
        }

        function createProductReview(review,itemId,userId,username){
            var url = "/api/product/review/";
            var ProductReview = {
                review : review,
                itemId : itemId,
                userId: userId,
                username:username
            };
            return $http.post(url,ProductReview);
        }
        
    }
})();
