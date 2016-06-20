
module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchemaProject = require("./user.schema.server")();
    var UserProject = mongoose.model("UserProject", UserSchemaProject);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByName: findUserByName,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findFacebookUser:findFacebookUser,
        findUserByGoogleId:findUserByGoogleId
    };
    return api;

    function updateUser(userId, user) {
        delete user._id;
        return UserProject
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }

    function deleteUser(userId) {
        return UserProject.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return UserProject.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return UserProject.findById(userId);
    }

    function findUserByName(username){
        return UserProject.findOne({username: username});
        // return User.find({username: username});
    }

    function createUser(user) {
        console.log("user.model.server.createUser()");
        console.log(user);
        var created_user = UserProject.create(user);
        console.log(created_user);
        return created_user;
    }

    function findFacebookUser(id){
        return UserProject.findOne({"facebook.id":id});
    }
    
    function findUserByGoogleId(id){
        return UserProject.findOne({"google.id":id});
    }

};