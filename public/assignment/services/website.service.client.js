/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);
    function WebsiteService($http){

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
        function createWebsite(userId,website){

            if(website.name === undefined)
                return null;
            var newWebsite = {
                name: website.name,
                description: website.description,
                developerId : userId
            }
            newWebsite = $http.post("/api/user/"+userId+"/website",newWebsite);
            return newWebsite;

        }

        //findWebsitesByUser(userId) - retrieves the websites in local websites array whose developerId
        // matches the parameter userId
        function findWebsitesByUser(userId){
            var websites = $http.get("/api/user/"+userId+"/website");
            return websites;
        }

        // findWebsiteById(websiteId) retrieves the website in local websites array whose _id matches the
        // websiteId parameter
        function findWebsiteById(websiteId){
            var website = $http.get("/api/website/"+websiteId);
            return website;

        }

        // updateWebsite(websiteId, website) updates the website in local websites array whose _id matches
        // the websiteId parameter
        function updateWebsite(website){

            var website = $http.put("/api/website/"+website._id,website);
            return website;

        }

        // deleteWebsite(websiteId) removes the website from local websites array whose _id matches the
        // websiteId parameter
        function deleteWebsite(websiteId){

            var result = $http.delete("/api/website/"+websiteId);
            return result;
        }
    }

})();
