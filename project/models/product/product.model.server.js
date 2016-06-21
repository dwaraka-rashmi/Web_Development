/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var ProductSchemaProject = require("./product.schema.server")();
    var ProductProject = mongoose.model("ProductProject", ProductSchemaProject);

};