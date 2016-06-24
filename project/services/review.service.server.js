/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function(app,models){

    var reviewModelProject = models.reviewModelProject;

    app.get("/api/product/review/:id",getProductReviewById);
    app.put("/api/product/review/:rid",updateProductReview);
    app.post("/api/product/review",createProductReview);

    function getProductReviewById(req,res){
        var itemId = req.params.id;
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

    function createProductReview(req,res){
        var reviewObject = {
            itemId : req.body.itemId,
            _user : req.body.userId,
            productReviews: req.body.review
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
            productReviews: req.body.review
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

};