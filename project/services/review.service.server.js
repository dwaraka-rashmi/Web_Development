/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function(app,models){

    var reviewModelProject = models.reviewModelProject;

    app.get("/api/product/review/:itemId",getProductReviewByItemId);
    app.get("/api/product/toReview",getProductReviewToReview);
    app.put("/api/product/review/:rid",updateProductReview);
    app.post("/api/product/review",createProductReview);
    app.put("/api/product/review/approve/:rid",approveReview);
    app.delete("/api/product/review/:rid",disapproveReview);

    function getProductReviewByItemId(req,res){
        var itemId = req.params.itemId;
        reviewModelProject
            .findProductReviewByItemId(itemId)
            .then(
                function(reviews){
                    res.json(reviews);
                },
                function(error){
                    res.json({});
                }
            )
    }

    function getProductReviewToReview(req,res){
        reviewModelProject
            .findProductAllUnapprovedReview()
            .then(
                function(reviews){
                    res.json(reviews);
                },
                function(error){
                    res.json({});
                }
            )
    }

    function disapproveReview(req,res){
        var reviewId = req.params.rid;
        reviewModelProject
            .deleteReview(reviewId)
            .then(
                function(response){
                    res.json(200);
                },
                function(error){
                    res.json(400);
                }
            )
    }

    function createProductReview(req,res){
        var reviewObject = {
            itemId : req.body.itemId,
            _user : req.body.userId,
            productReviews: req.body.review,
            productReviewTitle : req.body.reviewTitle,
            username:req.body.username,
            isReviewed:false
        };
        reviewModelProject
            .createProductReview(reviewObject)
            .then(function(review){
                    res.json(review);
                },
                function(error){
                    res.json(400);
                })
    }

    function updateProductReview(req,res){
        var reviewId = req.params.rid;
        var reviewObject = {
            itemId : req.body.itemId,
            _user : req.body.userId,
            productReviews: req.body.review,
            productReviewTitle : req.body.reviewTitle,
        };
        reviewModelProject
            .updateProductReview(reviewId,reviewObject)
            .then(
                function(resposne){
                    res.json(200);
                },
                function(error){
                    res.json(400);
                });
    }

    function approveReview(req,res){
        var reviewId = req.params.rid;
        var review = {
            isReviewed:true
        };
        reviewModelProject
            .updateProductReview(reviewId,review)
            .then(
                function(resposne){
                    res.json(200);
                },
                function(error){
                    res.json(400);
                });
    }

};