/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var ReviewSchemaProject = require("./review.schema.server.js")();
    var ReviewProject = mongoose.model("ReviewProject", ReviewSchemaProject);

    var api = {
        createProductReview: createProductReview,
        updateProductReview: updateProductReview,
        findProductReviewByItemId:findProductReviewByItemId,
        findProductReviewById: findProductReviewById,
        deleteReview:deleteReview,
        findProductAllUnapprovedReview:findProductAllUnapprovedReview
        
    };
    return api;


    function findProductAllUnapprovedReview(){
        return ReviewProject.find({isReviewed:false});
    }

    function findProductReviewById(reviewId){
        return ReviewProject.findById(reviewId);
    }

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

    function deleteReview(reviewId){
        return ReviewProject.remove({_id: reviewId});
    }
    
};