/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function(app,models){

    var reviewModelProject = models.reviewModelProject;

    app.get("/api/product/review/:itemId",getProductReviewByItemId);
    app.put("/api/product/review/:rid",updateProductReview);
    app.post("/api/product/review",createProductReview);
    app.put("/api/product/review/approve/:rid",approveReview);
    app.delete("/api/product/review/:rid",disapproveReview);

    function getProductReviewByItemId(req,res){
        var itemId = req.params.itemId;
        reviewModelProject
            .findProductReviewByItemId(itemId)
            .then(
                function(item){
                    res.json(item);
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
            username:req.body.username
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
            isReviewed:false
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