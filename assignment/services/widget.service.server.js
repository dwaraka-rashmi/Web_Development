module.exports = function (app) {

    var multer = require('multer'); // npm install multer save
    var upload = multer ({ dest: __dirname+'/../../public/uploads' });

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/upload",upload.single('myFile'),uploadImage);

    function createWidget(req,res){
        var newWidget = req.body;
        newWidget._id =  (new Date()).getTime()+"";
        console.log(newWidget);
        widgets.push(newWidget);
        res.send(newWidget);
    }

    function findAllWidgetsForPage(req,res) {
        var id = req.params.pageId;
        var AllWidgetsForPage = [];
        for (var i in widgets) {
            if (widgets[i].pageId === id) {
                AllWidgetsForPage.push(widgets[i]);
            }
        }
        // console.log(AllWidgetsForPage);
        res.send(AllWidgetsForPage);
    }

    function findWidgetById(req,res) {
        var id = req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id === id){
                res.send(widgets[i]);
                return;
            }
        }
        res.send({});
    }

    function updateWidget(req,res) {
        var id = req.params.widgetId;
        var widget = req.body;
        for(var i in widgets) {
            if (widgets[i]._id === id) {

                switch(widget.widgetType){
                    case 'HEADER':
                        widgets[i].name = widget.name;
                        if(widget.content != undefined){
                            widgets[i].text = widget.content;
                        }
                        widgets[i].size = widget.size;
                        break;
                    case 'IMAGE':
                        widgets[i].name = widget.name;
                        if(widget.content != undefined){
                            widgets[i].text = widget.content;
                        }
                        if(widget.url != undefined){
                            widgets[i].url = widget.url;
                        }
                        if(widget.width != undefined){
                            widgets[i].width = widget.width;
                        }
                        else {
                            widgets[i].width = "100%";
                        }
                        break;
                    case 'YOUTUBE':
                        widgets[i].name = widget.name;
                        if(widget.content != undefined){
                            widgets[i].text = widget.content;
                        }
                        if(widget.url != undefined){
                            widgets[i].url = widget.url;
                        }
                        if(widget.width != undefined){
                            widgets[i].width = widget.width;
                        }
                        else {
                            widgets[i].width = "100%";
                        }
                        break;
                    default: break;
                }
                res.send(widgets[i]);
                return;
            }
        }
        res.send({});

    }

    function deleteWidget(req,res) {
        var id = req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id === id){
                widgets.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
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