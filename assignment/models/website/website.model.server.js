/**
 * Created by Rashmi_Dwaraka on 6/10/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {

        findAllWebsitesForUser : findAllWebsitesForUser,
        createWebsite: createWebsite,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite

    };
    return api;

    function findAllWebsitesForUser(userId){
        return Website.find({"_user":userId});
    }

    function createWebsite(id,website){
        website._user = id;
        return Website.create(website);
    }

    function findWebsiteById(websiteId){
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId, website){
        delete website._id;
        return Website
            .update({_id: websiteId},{
                $set: {
                    name: website.name,
                    description: website.description
                }
            });
    }

    function deleteWebsite(websiteId){
        return Website.remove({_id: websiteId});
    }

};