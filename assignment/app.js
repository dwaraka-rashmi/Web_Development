/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
module.exports = function(app) {

    var models = require("./models/user.model.server.js")
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    
}