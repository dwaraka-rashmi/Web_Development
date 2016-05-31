/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
module.exports = function(app) {

    require("./services/user.service.server.js")(app);
    
    app.get("/say/:p", function(req,res){
        var msg = req.params['p'];
        res.send({message:msg});
       //console.log("hello world "+msg);
    });
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    app.get("/users",function(req,res){
       res.send({users:users});
    });
    app.get("/users/:id",function(req,res){
        var id = req.params.id;
        for(var i in users){
            if(users[i]._id === id){
                res.send({users:users[i]});
                return;
            }
            else
                res.send({});
        }

    });
}