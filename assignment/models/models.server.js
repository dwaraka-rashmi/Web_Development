/**
 * Created by Rashmi_Dwaraka on 6/7/2016.
 */
module.exports=function(){
  
    var mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/cs5610WebDev');

    var models = {
        userModel: require("./user/user.model.server")()
        //other models
        //pageModel
        //websiteModel
        //widgetModel
    };
    
    return models;
    
};