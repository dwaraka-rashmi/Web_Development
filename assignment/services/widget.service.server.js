module.exports = function (app,models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer save
    var upload = multer ({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/upload",upload.single('myFile'),uploadImage);
    app.put("/page/:pageId/widget",reorderWidget);

    function reorderWidget(req,res){

        var pageId = req.params.pageId;
        var start = req.query.start;
        var end = req.query.end;

        widgetModel
            .reorderWidget(pageId,start,end)
            .then(function(widgets){
                res.json(widgets);
            },
            function(widgets){
                res,json({});
            });

    }

    function createWidget(req,res){
        var id = req.params.pageId;
        var newWidget = req.body;
        widgetModel
            .createWidget(id,newWidget)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function findAllWidgetsForPage(req,res) {
        var id = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(id)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function findWidgetById(req,res) {
        var id = req.params.widgetId;
        widgetModel
            .findWidgetById(id)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function updateWidget(req,res) {
        var id = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(id,widget)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.json({});
                }
            );
    }

    function deleteWidget(req,res) {
        var id = req.params.widgetId;
        widgetModel
            .deleteWidget(id)
            .then(
                function(widget){
                    res.json(200);
                },
                function(error){
                    res.json(400);
                }
            );
    }

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId ;
        var width = req.body.width ;
        var myFile = req.file;
        if(myFile) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename; // new file name in upload folder
            var path = myFile.path; // full path of uploaded file
            var destination = myFile.destination; // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            var id = req.params.widgetId;

            var widget = { "url": "/uploads/" + filename};
            widgetModel
                .updateWidget(id,widget)
                .then(
                    function(widget){
                        console.log(req.body);
                        res.redirect("/assignment/index.html#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget/" + widgetId);
                    },
                    function(error){
                        res.json({});
                    }
                );
        }

    }

}