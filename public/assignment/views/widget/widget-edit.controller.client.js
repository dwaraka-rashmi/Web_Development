/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController);
    function EditWidgetController($location,$sce,$routeParams,WidgetService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init(){
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function deleteWidget(){
            var result = WidgetService.deleteWidget(vm.widgetId);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget")
            }
            else{
                vm.error = "Unable to delete Widget"
            }
        }
        function updateWidget(widget,pageId){
            widget.pageId = pageId;
            var result = WidgetService.updateWidget(vm.widgetId, widget);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget")
            }
            else {
                vm.error = "Unable to update Widget"
            }
        }
        // function getSafeHtml(widget){
        //     return $sce.trustAsHtml(widget.text);
        // }
        //
        // function getSafeUrl(widget){
        //     var urlParts = widget.url.split("/");
        //     var id = urlParts[urlParts.length - 1];
        //     var url = "https://www.youtube.com/embed/"+id;
        //     return $sce.trustAsResourceUrl(url);
        // }


    }
})();