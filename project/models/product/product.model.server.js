/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var ProductSchemaProject = require("./product.schema.server")();
    var ProductProject = mongoose.model("ProductProject", ProductSchemaProject);

    var api = {
        createProduct: createProduct,
        updateProduct:updateProduct,
        findProductByItemId:findProductByItemId
    };
    return api;
    
    function findProductByItemId(itemId){
        return ProductProject.findOne({itemId:itemId});
    }
    
    function updateProduct(productId,product){
        delete product._id;
        return ProductProject
            .update({_id: productId},{
                $set: product
            });
    }

    function createProduct(product){
        return ProductProject.create(product);
    }
    
};