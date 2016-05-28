/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController",NewWidgetController);
    function NewWidgetController($location,$sce,$routeParams,WidgetService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.createWidget = createWidget;


        function init(){
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function createWidget(type){
            var widget = {
                widgetType:type
            };
            vm.widget = WidgetService.createWidget(vm.pageId,widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget){
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

    }
})();