/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
module.exports = function(app){

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.get("/api/user", getUsers);
    app.get("/api/user/:id", getUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:id", updateUser);
    app.delete("/api/user/:id",deleteUser);

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

    function createUser(req,res){
        var user = req.body;
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
                return users[i];
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
};