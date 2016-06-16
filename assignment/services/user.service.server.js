/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app,models){

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/logout", logout);
    app.get("/api/user/:id", getUserById);
    app.put("/api/user/:id", updateUser);
    app.delete("/api/user/:id",deleteUser);

    passport.use('wam',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        done(null, user);
                    }
                    else
                    {
                        done(null, false);
                    }
                },
                function(err) {
                    done(err);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function login(req,res){

        var user = req.user;
        console.log("login"+user);
        res.json(user);

    }

    function logout(req,res){
        req.logout();
        res.send(200);
    }

    function loggedIn(req,res){
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else {
            res.json('0');
        }
    }

    function createUser(req,res){
        var user = req.body;
        //duplicate username validation
        userModel
            .findUserByName(user.username)
            .then(
                function(success){
                    if(success.length==0) {
                        userModel
                            .createUser(user)
                            .then(
                                function (user) {
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
            getUserByCredentials(username,password,req,res);
        }
        else
        if(username){
            getUserByUsername(username,req,res);
        }
        else {
            res.statusCode(400).send(error);
        }
    }

    function getUserByCredentials(username,password,req,res){

        userModel
            .findUserByCredentials(username,password)
            .then(
                function(user){
                    console.log(req.session);
                    req.session.currentUser = user;
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function getUserByUsername(username,req,res){
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