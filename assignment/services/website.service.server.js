/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
module.exports = function(app,models){

 var websiteModel = models.websiteModel;
    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "developerId": "456" },
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456" },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123" },
    //     { "_id": "789", "name": "Chess",       "developerId": "234" }
    // ];

    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    function createWebsite(req,res){
        var id = req.params.userId;
        var newWebsite = req.body;
        websiteModel
            .createWebsite(id,newWebsite)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.json({});
                }
            );
        // newWebsite._id =  (new Date()).getTime()+"";
        // websites.push(newWebsite);
        // res.send(newWebsite);
    }

    function findAllWebsitesForUser(req,res) {
        var id = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(id)
            .then(
                function(websites){
                    res.json(websites);
                },
                function(error){
                    res.json({});
                }
            );
        // var AllWebsitesForUser = [];
        // for (var i in websites) {
        //     if (websites[i].developerId === id) {
        //         AllWebsitesForUser.push(websites[i]);
        //     }
        // }
        // // console.log(AllWebsitesForUser);
        // res.send(AllWebsitesForUser);
    }

    function findWebsiteById(req,res) {
        var id = req.params.websiteId;

        websiteModel
            .findWebsiteById(id)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.json({});
                }
            );
        // for(var i in websites){
        //     if(websites[i]._id === id){
        //         res.send(websites[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function updateWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId,website)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.json({});
                }
            );
        // for(var i in websites) {
        //     if (websites[i]._id === websiteId) {
        //         websites[i].name = website.name;
        //         websites[i].developerId = website.developerId;
        //         websites[i].description = website.description;
        //         res.send(websites[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function deleteWebsite(req,res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(success){
                    res.json(200);
                },
                function(error){
                    res.json(400);
                }
            );
        // for(var i in websites){
        //     if(websites[i]._id === websiteId){
        //         websites.splice(i,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

};