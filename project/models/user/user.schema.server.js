/**
 * Created by Rashmi_Dwaraka on 6/9/2016.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchemaProject = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        google:{
            token:String,
            id:String
        },
        dob: Date,
        //websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchemaProject;
};