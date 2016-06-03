/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
module.exports = function(app){

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:id", getUserById);
    app.put("/api/user/:id", updateUser);
    app.delete("/api/user/:id",deleteUser);

    function createUser(req,res){
        var user = req.body;
        //duplicate username validation
        for(var i in users){
            if(users[i].username===user.username){
                res.send({});
                return;
            }
        }
        user._id = (new Date()).getTime()+"";
        users.push(user);
        console.log(users);
        res.send(user);
    }

    function getUsers(req,res){
        var username = req.query.username;
        var password = req.query.password;
        //console.log(username+" "+password);
        if(username&&password){
            findUserByCredentials(username,password,res);
        }
        else
        if(username){
            findUserByUsername(username,res);
        }
        else
            res.send(users);
    }

    function findUserByCredentials(username,password,res){
        for(var i in users){
            if(users[i].username===username && users[i].password===password){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserByUsername(username,res){
        for(var i in users){
            if(users[i].username===username){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function getUserById(req,res){
        var id = req.params.id;
        for(var i in users){
            if(users[i]._id === id){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function updateUser(req,res){
        var id = req.params.id;
        var user = req.body;
        for(var i in users) {
            if (users[i]._id === id) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                //console.log(user);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteUser(req,res){
        var id = req.params.id;
        for(var i in users) {
            if (users[i]._id === id) {
                users.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

};