/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);
   
    function WidgetService($http){

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

            var newWidget = {
                widgetType: widget.widgetType,
                pageId : pageId
            };

            var newWidget = $http.post("/api/page/"+pageId+"/widget",newWidget);
            return newWidget;
        }

        // findWidgetsByPageId(pageId) - retrieves the widgets in local widgets array whose pageId
        // matches the parameter pageId
        function findWidgetsByPageId(pageId){
            var widgets = $http.get("/api/page/"+pageId+"/widget");
            return widgets;
        }

        //findWidgetById(widgetId) - retrieves the widget in local widgets array whose _id matches the widgetId parameter
        function findWidgetById(widgetId){
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        //updateWidget(widgetId, widget) - updates the widget in local widgets array whose _id matches the widgetId parameter
        function updateWidget(widgetId, widget) {

            var result = $http.put("/api/widget/"+widgetId,widget);
            return result;
        }

        //deleteWidget(widgetId) - removes the widget from local widgets array whose _id matches the widgetId parameter
        function deleteWidget(widgetId){
            var result = $http.delete("/api/widget/"+widgetId);
            return result;
        }

    }

})();