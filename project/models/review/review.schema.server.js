/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var ReviewSchemaProject = mongoose.Schema({
        itemId: String,
        _user:{type:mongoose.Schema.ObjectId,ref:"UserProject"},
        username : String,
        productReviews: String,
        isReviewed: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.review"});

    return ReviewSchemaProject;
};