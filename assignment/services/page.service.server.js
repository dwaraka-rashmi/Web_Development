module.exports = function (app) {
    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456"},
        {"_id": "432", "name": "Post 2", "websiteId": "456"},
        {"_id": "543", "name": "Post 3", "websiteId": "456"}
    ];


    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    function createPage(req,res){
        var newPage = req.body;
        newPage._id =  (new Date()).getTime()+"";
        // console.log(newPage);
        pages.push(newPage);
        res.send(newPage);
    }

    function findAllPagesForWebsite(req,res) {
        var id = req.params.websiteId;
        var AllPagesForWebsite = [];
        for (var i in pages) {
            if (pages[i].websiteId === id) {
                AllPagesForWebsite.push(pages[i]);
            }
        }
        // console.log(AllPagesForWebsite);
        res.send(AllPagesForWebsite);
    }

    function findPageById(req,res) {
        var id = req.params.pageId;
        for(var i in pages){
            if(pages[i]._id === id){
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }

    function updatePage(req,res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for(var i in pages){
            if(pages[i]._id === pageId){
                pages[i].name = page.name;
                pages[i].description = page.description;
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }

    function deletePage(req,res) {
        
        var pageId = req.params.pageId;
        for(var i in pages){
            if(pages[i]._id === pageId){
                pages.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);

    }

}