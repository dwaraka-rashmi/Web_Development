/**
 * Created by Rashmi_Dwaraka on 6/10/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidget:reorderWidget
    };
    return api;

    function createWidget(pageId, widget){
        widget._page = pageId;
        return Widget
            .find({_page: pageId})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function (error) {
                    return null;
                }
            );
    }

    function findAllWidgetsForPage(pageId){
        return Widget.find({"_page":pageId});
    }

    function findWidgetById(widgetId){
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget){
        delete widget._id;
        return Widget
            .update({_id: widgetId},{
                $set: widget
            });
    }

    function deleteWidget(widgetId){
        return Widget.remove({_id: widgetId});
    }

    function reorderWidget(pageId,start,end){
        // var widgetId = widget._id;
        // delete widget._id;
        // return Widget
        //     .update({_id: widgetId},{
        //         $set: widget
        //     });
        // for(var i = 0;i<widgets.length;i++){
        //     delete widgets[i]._id;
        // }
        // // widgets.forEach(function(widget){
        // //     delete widget._id;
        // // });
        // console.log(widgets);
        // // Widget.remove({_page: pageId},function(error, doc, result) {
        //     return  Widget.update({_page: pageId}, {$set: widgets}, false, true);
        // // });

            return Widget
                    .find({_page:pageId},
                        function(err,widgets){
                        widgets.forEach(function(widget){
                            if(widget.order==start){
                   //             delete widget._id;
                                widget.order = end;
                                widget.save(function(){});
                            }
                            else if(widget.order>start && widget.order<end){
                                //delete widget._id;
                                widget.order = widget.order-1;
                                widget.save(function(){});
                            }
                            else if(widget.order<start && widget.order>end){
                                // delete widget._id;
                                widget.order = widget.order+1
                                widget.save(function(){});
                            }
                        });
                });



    }

}