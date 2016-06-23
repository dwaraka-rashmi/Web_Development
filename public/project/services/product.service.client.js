/**
 * Created by Rashmi_Dwaraka on 6/21/2016.
 */
(function(){
    angular
        .module("BestShop")
        .factory("ProductService", ProductService);

    function ProductService($http) {
        
        var api = {
            getProductReviewByItemId:getProductReviewByItemId,
            updateProductReview:updateProductReview,
            createProductReview:createProductReview
            // updateProduct:updateProduct
        };
        return api;

        // function updateProduct(review,item,userId){
        //
        //     var product = {
        //         item : item,
        //         review : review,
        //         userId: userId
        //     };
        //     $http.put("/api/product/review",product);
        //
        // }

        function getProductReviewByItemId(itemId){
            var url = "/api/product/review/"+itemId;
            return $http.get(url);
        }
        
        function updateProductReview(reviewId,review,itemId,userId){
            var url = "/api/product/review/"+reviewId;
            var ProductReview = {
                review : review,
                itemId : itemId,
                userId: userId
            };
            return $http.put(url,ProductReview);
        }

        function createProductReview(review,itemId,userId){
            var url = "/api/product/review/";
            var ProductReview = {
                review : review,
                itemId : itemId,
                userId: userId
            };
            return $http.post(url,ProductReview);
        }
        
    }
})();
