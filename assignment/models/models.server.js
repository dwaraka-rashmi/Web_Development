/**
 * Created by Rashmi_Dwaraka on 6/7/2016.
 */
module.exports=function(){

    var connectionString = 'mongodb://127.0.0.1:27017/webdev';
    // var connectionString = 'mongodb://localhost/cs5610WebDev';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    mongoose.connect('mongodb://localhost/cs5610WebDev');

    var models = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel:require("./page/page.model.server")(),
        widgetModel:require("./widget/widget.model.server")()
    };
    
    return models;
    
};