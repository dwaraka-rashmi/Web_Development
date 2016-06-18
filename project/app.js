/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
module.exports = function(app) {

    var models = require("./models/models.server")();

    require("./services/user.service.server.js")(app, models);
}