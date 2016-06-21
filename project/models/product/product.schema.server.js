/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var ProductSchemaProject = mongoose.Schema({
        name: String,
        productDetails:{},
        category:String,//category api not working with jsonp
        productReviews:{
            _user:{type:mongoose.Schema.ObjectId,ref:"UserProject"},
            review: String
        },
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.product"});

    return ProductSchemaProject;
};