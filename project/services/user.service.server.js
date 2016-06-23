/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app,models){

    var userModelProject = models.userModelProject;

    app.post("/api/user", createUser);
    app.post("/api/register", register);
    app.get("/api/user", getUsers);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/login", passport.authenticate('bs'), login);
    app.post("/api/logout", logout);
    app.get("/api/user/:id", getUserById);
    app.get("/api/allUsers/",getAllUsers);
    app.put("/api/user/:id", updateUser);
    app.put("/api/user/follow/:id",followUser);
    app.delete("/api/user/:id",deleteUser);

    var multer = require('multer'); // npm install multer save
    var uploadProPic = multer ({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/uploadPic",uploadProPic.single('myFile'),uploadImage);

    // app.get("/auth/facebook",passport.authenticate('facebookP'));
    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebookP', {
    //         successRedirect: '/project/#/user',
    //         failureRedirect: '/project/#/login'
    //     }));

    app.get("/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get("/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    passport.use('bs',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL1
    // };
    // passport.use('facebookP',new PFacebookStrategy(facebookConfig, facebookLogin));

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };
    passport.use('google',new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        userModelProject
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModelProject.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    //Facebook Login function
    // function facebookLogin(token, refreshToken, profile, done) {
    //     userModelProject
    //         .findFacebookUser(profile.id)
    //         .then(
    //             function(facebookuser){
    //                 if(facebookuser){
    //                     return done(null,facebookuser);
    //                 } else {
    //                     facebookuser = {
    //                         username: profile.displayName.replace(/ /g,''),
    //                         facebook: {
    //                             token:token,
    //                             id: profile.id,
    //                             displayName:profile.displayName
    //                         }
    //                     };
    //                     userModelProject
    //                         .createUser(facebookuser)
    //                         .then(
    //                             function(user){
    //                                 done(null,user);
    //                             }
    //                         );
    //                 }
    //             }
    //         )
    // }

    function localStrategy(username, password, done) {
        userModelProject
            .findUserByName(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
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
        userModelProject
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
        res.json(user);
    }

    function logout(req,res){
        req.logout();
        res.status(200).send("Logged out successful!");
    }

    function loggedIn(req,res){
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else {
            res.json('0');
        }
    }

    function register(req,res){

        var username = req.body.username;
        var password = req.body.password;
        userModelProject
            .findUserByName(username)
            .then(
                function(user){
                    if(user){
                        res.status(400).send("Username already in use");
                        return;
                    }
                    else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModelProject
                            .createUser(req.body);
                    }
                },
                function(error){
                    res.status(400).send(error);
                })
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(error){
                    res.status(400).send(error);
                });
    }

    function createUser(req,res){
        var user = req.body;
        //duplicate username validation
        userModelProject
            .findUserByName(user.username)
            .then(
                function(success){
                    if(success.length==0) {
                        userModelProject
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

        userModelProject
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
        userModelProject
            .findUserByName(username)
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
        userModelProject
            .findUserById(id)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function getAllUsers(req,res){

        userModelProject
            .findAllUsers()
            .then(
                function(users){
                    res.json(users);
                },
                function(error){
                    res.statusCode(404).send(error);
                });
    }

    function updateUser(req,res){

        var id = req.params.id;
        var newUser = req.body;
        userModelProject
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                });
    }

    function followUser(req,res){

        var id = req.params.id;
        var userFollowed = req.body;
        console.log(userFollowed);
        userModelProject
            .findUserById(id)
            .then(
                function(user) {
                    console.log("old"+user);
                    user.followers.push(userFollowed.userId);
                    console.log("new"+user);
                    userModelProject
                        .updateUser(id,user)
                        .then(
                            function(stats) {
                                console.log(stats);
                                updateFollowedBy(userFollowed.userId,id,res);
                                // res.send(200);
                            },
                            function(error) {
                                res.statusCode(404).send(error);
                            }
                        );
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateFollowedBy(id,followedById,res){
        userModelProject
            .findUserById(id)
            .then(
                function(user) {
                    console.log("old"+user);
                    user.followedBy.push(followedById);
                    console.log("new"+user);
                    userModelProject
                        .updateUser(id,user)
                        .then(
                            function(stats) {
                                console.log(stats);
                                res.send(200);
                            },
                            function(error) {
                                res.statusCode(404).send(error);
                            }
                        );
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteUser(req,res){

        var id = req.params.id;
        userModelProject
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

    function uploadImage(req, res) {

        console.log(req.body);
        var myFile = req.file;
        if(myFile) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename; // new file name in upload folder
            var path = myFile.path; // full path of uploaded file
            var destination = myFile.destination; // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            var user = {
                "pic" : "/uploads/" + filename
            };
            console.log(user);
            var id = req.body.userId;
            userModelProject
                .updateUser(id, user)
                .then(
                    function(stats) {
                        console.log(stats);
                        // res.redirect("/project/index.html#/user/" + req.body.userId);
                        res.redirect("/project/index.html#/user");
                    },
                    function(error) {
                        res.statusCode(404).send(error);
                    });
        }
    }

};