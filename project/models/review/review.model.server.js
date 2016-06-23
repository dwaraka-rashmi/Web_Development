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
        return ReviewProject.findOne({itemId:itemId});
    }
    
    function updateProductReview(productId,product){
        delete product._id;
        return ReviewProject
            .update({_id: productId},{
                $set: product
            });
    }

    function createProductReview(review){
        return ReviewProject.create(review);
    }
    
};