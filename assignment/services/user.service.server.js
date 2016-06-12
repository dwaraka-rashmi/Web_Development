/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
module.exports = function(app,models){

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:id", getUserById);
    app.put("/api/user/:id", updateUser);
    app.delete("/api/user/:id",deleteUser);

    function createUser(req,res){
        var user = req.body;
        //duplicate username validation
        userModel
            .findUserByName(user.username)
            .then(
                function(success){
                    console.log("success:"+success);
                    console.log("success l "+success.length);
                    if(success.length==0) {
                        userModel
                            .createUser(user)
                            .then(
                                function (user) {
                                    console.log(user);
                                    res.json(user);
                                },
                                function (error) {
                                    res.statusCode(400).send(error);
                                }
                            );
                    }
                    else {
                        console.log("already exists");
                        res.json({});
                        // res.statusCode(400).send(error);
                    }
                },
                function(error){
                    res.statusCode(400).send(error);
                });
    }

    function getUsers(req,res){
        var username = req.query.username;
        var password = req.query.password;
        //console.log(username+" "+password);
        if(username&&password){
            userModel
                .findUserByCredentials(username,password)
                .then(
                    function(user){
                        console.log(user);
                        res.json(user);
                    },
                    function(error) {
                        res.statusCode(400).send(error);
                    }
                );
        }
        else
        if(username){
            userModel
                .findUserByUsername(username)
                .then(
                    function(user){
                        console.log(user);
                        res.json(user);
                    },
                    function(error) {
                        res.statusCode(400).send(error);
                    }
                );
        }
        else {
            res.statusCode(400).send(error);
        }
    }


    function getUserById(req,res){

        var id = req.params.id;
        userModel
            .findUserById(id)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function updateUser(req,res){

        var id = req.params.id;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function deleteUser(req,res){

        var id = req.params.id;

        userModel
            .deleteUser(id)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

};