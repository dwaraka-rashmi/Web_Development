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
            findWebsitesByUser : findWebsitesByUser,
            createWebsite : createWebsite
        };
        return api;

        //createWebsite(userId, website) - adds the website parameter 
        // instance to the local websites array. The new website's developerId is set to the userId parameter
        function createWebsite(userId,name,description){
            var newWebsite = {
                _id: (new Date()).getTime()+"",
                name: name,
                description: description,
                developerId : userId
            }
            websites.push(newWebsite);
            return newWebsite;
        }

        //findWebsitesByUser(userId) - retrieves the websites in local websites array whose developerId matches the parameter userId
        function findWebsitesByUser(userId){
            var resultSet = [];
            for(var i in websites){
                if(websites[i].developerId === userId){
                    resultSet.push(websites[i]);
                }
            }
            return resultSet;
        }

    }

})();
