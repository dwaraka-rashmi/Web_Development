module.exports = function (app,models) {

    var pageModel = models.pageModel;
    // var pages = [
    //     {"_id": "321", "name": "Post 1", "websiteId": "456"},
    //     {"_id": "432", "name": "Post 2", "websiteId": "456"},
    //     {"_id": "543", "name": "Post 3", "websiteId": "456"}
    // ];

    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    function createPage(req,res){
        var id = req.params.websiteId;
        var newPage = req.body;
        pageModel
            .createPage(id,newPage)
            .then(
                function(page){
                    res.json(page);
                },
                function(error){
                    res.json({});
                }
            );
        // newPage._id =  (new Date()).getTime()+"";
        // pages.push(newPage);
        // res.send(newPage);
    }

    function findAllPagesForWebsite(req,res) {
        var id = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(id)
            .then(
                function(pages){
                    res.json(pages);
                },
                function(error){
                    res.json({});
                }
            );
        // var AllPagesForWebsite = [];
        // for (var i in pages) {
        //     if (pages[i].websiteId === id) {
        //         AllPagesForWebsite.push(pages[i]);
        //     }
        // }
        // res.send(AllPagesForWebsite);
    }

    function findPageById(req,res) {
        var id = req.params.pageId;
        pageModel
            .findPageById(id)
            .then(
                function(page){
                    res.json(page);
                },
                function(error){
                    res.json({});
                }
            );
        // for(var i in pages){
        //     if(pages[i]._id === id){
        //         res.send(pages[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function updatePage(req,res) {
        var pageId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pageId,page)
            .then(
                function(page){
                    res.json(page);
                },
                function(error){
                    res.json({});
                }
            );
        // for(var i in pages){
        //     if(pages[i]._id === pageId){
        //         pages[i].name = page.name;
        //         pages[i].description = page.description;
        //         res.send(pages[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function deletePage(req,res) {

        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function(success){
                    res.json(200);
                },
                function(error){
                    res.json(400);
                }
            );
        // for(var i in pages){
        //     if(pages[i]._id === pageId){
        //         pages.splice(i,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);

    }

}