/**
 * Created by Rashmi_Dwaraka on 6/7/2016.
 */
module.exports=function(){
    
    var mongoose = require("mongoose");

    var models = {
        userModelProject: require("./user/user.model.server")()
    };
    
    return models;
    
};