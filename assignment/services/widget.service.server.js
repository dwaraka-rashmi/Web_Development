module.exports = function (app,models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer save
    var upload = multer ({ dest: __dirname+'/../../public/uploads' });

    // var widgets = [
    //     { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];

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
        start = start;
        end = end;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    widgets.forEach(function(widget){
                        delete widget._id;
                        if(widget.order==start){
                            
                            widget.order = end;
                        }
                        else if(widget.order>start && widget.order<=end){
                            widget.order = widget.order-1;
                        }
                        else if(widget.order<start && widget.order>=end){
                            widget.order = widget.order+1;
                        }

                    });
                    // console.log(widgets);
                    widgetModel
                        .reorderWidget(pageId,widgets)
                        .then(
                            function(response){
                                res.json(widgets);
                            },
                            function(error){
                                res.json({});
                            });
                },
                function(error){
                    res.json({});
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
        // newWidget._id =  (new Date()).getTime()+"";
        // console.log(newWidget);
        // widgets.push(newWidget);
        // res.send(newWidget);
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
        // var AllWidgetsForPage = [];
        // for (var i in widgets) {
        //     if (widgets[i].pageId === id) {
        //         AllWidgetsForPage.push(widgets[i]);
        //     }
        // }
        // // console.log(AllWidgetsForPage);
        // res.send(AllWidgetsForPage);
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
        // for(var i in widgets){
        //     if(widgets[i]._id === id){
        //         res.send(widgets[i]);
        //         return;
        //     }
        // }
        // res.send({});
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
        // for(var i in widgets){
        //     if(widgets[i]._id === id){
        //         widgets.splice(i,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
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
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].url = "/uploads/" + filename;
                    // console.log(widgets[i]);
                }
            }
        }

        console.log(req.body);
        res.redirect("/assignment/index.html#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget/" + widgetId);

    }


}