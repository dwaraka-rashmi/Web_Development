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
        return ProductProject.findOne({itemId:itemId});
    }
    
    function updateProductReview(productId,product){
        delete product._id;
        return ProductProject
            .update({_id: productId},{
                $set: product
            });
    }

    function createProductReview(review){
        return ProductProject.create(review);
    }
    
};