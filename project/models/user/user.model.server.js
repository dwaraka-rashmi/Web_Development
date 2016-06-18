
module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("UserProject", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByName: findUserByName,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findFacebookUser:findFacebookUser
    };
    return api;

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByName(username){
        return User.findOne({username: username});
        // return User.find({username: username});
    }

    function createUser(user) {
        console.log("user.model.server.createUser()");
        console.log(user);
        var created_user = User.create(user);
        console.log(created_user);
        return created_user;
    }

    function findFacebookUser(id){
        return User.findOne({"facebook.id":id});
    }

};