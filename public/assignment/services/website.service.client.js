/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function WebsiteService(){


        var api = {
            createWebsite: createWebsite,
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
                    users.splice(i);
                }
            }
        }


    }

})();