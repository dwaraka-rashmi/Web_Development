/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .factory("UserService",UserService);

    function UserService($http){

        var api = {
            createUser: createUser,
            register: register,
            login : login,
            logout: logout,
            loggedIn:loggedIn,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findUsers:findUsers,
            updateUser: updateUser,
            deleteUser: deleteUser,
            followUser:followUser,
            searchUsers:searchUsers
        };
        return api;

        //createUser(user) - adds the user parameter instance to the local users array
        function createUser(user){

            var newUser = {
                username: user.username,
                password: user.password
            };
            var result = $http.post("/api/user",newUser);
            return result;
        }

        function register(user){

            var newUser = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/register",newUser);
        }

        function login(username,password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login",user);

        }

        function logout(){
            return $http.post("/api/logout");
        }

        function loggedIn(){
            return $http.get("/api/loggedIn");
        }

        //findUserById(userId) - returns the user in local users array whose _id matches the userId parameter
        function findUserById(userId){
            var url = "/api/user/"+userId;
            return $http.get(url);

        }

        //findUserByUsername(username) - returns the user in local users array whose username matches the parameter username
        function findUserByUsername(username){
            var url = "/api/user?username="+username;
            return $http.get(url);

        }

        //findUserByCredentials(username, password) - returns the user whose username and password match the username and password parameters
        function findUserByCredentials(username,password){
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        //updateUser(userId, user) - updates the user in local users array whose _id matches the userId parameter
        function updateUser(userId,newUser){
            var url = "/api/user/"+userId;
            return $http.put(url,newUser);

        }

        function followUser(loggedUserId,userId){
            var url = "/api/user/follow/"+loggedUserId;
            var userToFollow = {
                userId : userId
            };
            return $http.put(url,userToFollow);
        }

        //deleteUser(userId) - removes the user whose _id matches the userId parameter
        function deleteUser(userId){
            var url = "/api/user/"+userId;
            return $http.delete(url);

        }

        function findUsers(){
            var url = "/api/allUsers/";
            return $http.get(url);
        }

        function searchUsers(){
        
        }



    }

})();