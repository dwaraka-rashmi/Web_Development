/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function UserService(){


        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        //createUser(user) - adds the user parameter instance to the local users array
        function createUser(user){
            users.push(user);
        }

        //findUserById(userId) - returns the user in local users array whose _id matches the userId parameter
        function findUserById(userId){
            for(var i in users) {
                if (users[i]._id === userId) {
                    return  users[i];
                }
            }
            return null;
        }

        //findUserByUsername(username) - returns the user in local users array whose username matches the parameter username
        function findUserByUsername(username){
            for(var i in users) {
                if (users[i].username === username) {
                    return  users[i];
                } else {
                    return null;
                }
            }
        }

        //findUserByCredentials(username, password) - returns the user whose username and password match the username and password parameters
        function findUserByCredentials(username,password){
            for(var i in users) {
                if (users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }

        //updateUser(userId, user) - updates the user in local users array whose _id matches the userId parameter
        function updateUser(userId,user){
            for(var i in users) {
                if (users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    //console.log(user);
                    return true;
                }
            }
            return false;
        }

        //deleteUser(userId) - removes the user whose _id matches the userId parameter
        function deleteUser(userId){
            for(var i in users) {
                if (users[i]._id === userId) {
                    users.splice(i,1);
                }
            }
        }


    }

})();