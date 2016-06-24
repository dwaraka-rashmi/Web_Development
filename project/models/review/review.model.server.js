/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var ReviewSchemaProject = require("./review.schema.server.js")();
    var ReviewProject = mongoose.model("ReviewProject", ReviewSchemaProject);

    var api = {
        createProductReview: createProductReview,
        updateProductReview:updateProductReview,
        findProductReviewByItemId:findProductReviewByItemId
        
    };
    return api;
    
    function findProductReviewByItemId(itemId){
        return ReviewProject.find({itemId:itemId});
    }
    
    function updateProductReview(reviewId,review){
        delete review._id;
        return ReviewProject
            .update({_id: reviewId},{
                $set: review
            });
    }

    function createProductReview(review){
        return ReviewProject.create(review);
    }
    
};