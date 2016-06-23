/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var ProductSchemaProject = mongoose.Schema({
        productName: String,
        itemId: String,
        Users :[{type:mongoose.Schema.ObjectId,ref:"UserProject"}],
        Reviews:[{type:mongoose.Schema.ObjectId,ref:"ReviewProject"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.product"});

    return ProductSchemaProject;
};