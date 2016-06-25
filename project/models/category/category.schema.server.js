/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var CategorySchemaProject = mongoose.Schema({
        category : String,
        categoryId:String,
        categoryPath:String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.category"});

    return CategorySchemaProject;
};