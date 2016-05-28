/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController);
    function EditWidgetController($sce,$routeParams,WidgetService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;

        function init(){
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget(widget){
            var result = WidgetService.updateWidget(vm.widgetId, widget);
            if(result){
                $location.url("/user/"+vm.userId+"/website")
            }
            else {
                vm.error = "Unable to delete website"
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