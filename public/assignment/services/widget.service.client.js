/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);
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

    function WidgetService(){

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        // createWidget(pageId, widget) - adds the widget parameter instance to the local widgets array.
        //     The new widget's pageId is set to the pageId parameter
        function createWidget(pageId, widget){
            //if(widget.name === undefined)
            //  return null;
            var newWidget = {
                _id: (new Date()).getTime()+"",
                widgetType: widget.widgetType
            };

            widgets.push(newWidget);
            return newWidget;

        }

        // findWidgetsByPageId(pageId) - retrieves the widgets in local widgets array whose pageId
        // matches the parameter pageId
        function findWidgetsByPageId(pageId){
            var resultSet = [];
            for(var i in widgets){
                if(widgets[i].pageId === pageId){
                    resultSet.push(widgets[i]);
                }
            }
            return resultSet;
        }

        //findWidgetById(widgetId) - retrieves the widget in local widgets array whose _id matches the widgetId parameter
        function findWidgetById(widgetId){
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    return widgets[i];
                }
            }
            return null;
        }

        //updateWidget(widgetId, widget) - updates the widget in local widgets array whose _id matches the widgetId parameter
        function updateWidget(widgetId, widget) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].name = widget.name;
                    widgets[i].pageId = widget.pageId;
                    if(widget.content != undefined){
                        widgets[i].text = widget.content;
                    }
                    if(widget.url != undefined){
                        widgets[i].url = widget.url;
                    }
                    if(widget.size != undefined){
                        widgets[i].size = widget.size;
                    }
                    if(widget.width != undefined){
                        widgets[i].width = widget.width;
                    }
                    if(widget.upload != undefined){
                        widgets[i].upload = widget.upload;
                    }
                    return true;
                }
            }
            return false;
        }

        //deleteWidget(widgetId) - removes the widget from local widgets array whose _id matches the widgetId parameter
        function deleteWidget(widgetId){
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    widgets.splice(i,1);
                    return true;
                }
            }
            return false;
        }

    }

})();