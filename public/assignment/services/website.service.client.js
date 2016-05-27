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
            createWebsite : createWebsite,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return api;

        //createWebsite(userId, website) - adds the website parameter 
        // instance to the local websites array. The new website's developerId is set to the userId parameter
        function createWebsite(userId,name,description){

            if(name === undefined)
                return null;
            var newWebsite = {
                _id: (new Date()).getTime()+"",
                name: name,
                description: description,
                developerId : userId
            }
            websites.push(newWebsite);
            return newWebsite;
        }

        //findWebsitesByUser(userId) - retrieves the websites in local websites array whose developerId
        // matches the parameter userId
        function findWebsitesByUser(userId){
            var resultSet = [];
            for(var i in websites){
                if(websites[i].developerId === userId){
                    resultSet.push(websites[i]);
                }
            }
            return resultSet;
        }

        // findWebsiteById(websiteId) retrieves the website in local websites array whose _id matches the
        // websiteId parameter
        function findWebsiteById(websiteId){

            for(var i in websites){
                if(websites[i]._id === websiteId){
                    return websites[i];
                }
            }
            return null;
        }

        // updateWebsite(websiteId, website) updates the website in local websites array whose _id matches
        // the websiteId parameter
        function updateWebsite(websiteId, website){

            for(var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites[i].name = website.name;
                    websites[i].developerId = website.developerId;
                    return true;
                }
            }
            return false;
        }

        // deleteWebsite(websiteId) removes the website from local websites array whose _id matches the
        // websiteId parameter
        function deleteWebsite(websiteId){

            for(var i in websites){
                if(websites[i]._id === websiteId){
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
        }

    }

})();
