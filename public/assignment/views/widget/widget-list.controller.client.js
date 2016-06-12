/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController);

    function WidgetListController($sce,$routeParams,WidgetService){

        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidget = reorderWidget;
        vm.error = false;

        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function(response){
                        vm.widgets = response.data;
                    },
                    function(response){
                        vm.error = "Unable to fetch the widgets";
                    });
            // $(".container").sortable({axis:"y"});
        }
        init();

        function reorderWidget(start,end){
            console.log(start+" "+end);
            WidgetService
                .reorderWidget(vm.pageId,start,end)
                .then(
                    function(response){
                        // vm.widgets = response.data;
                        init();
                    },
                    function(response){
                        vm.error = "Unable to reorder widgets";
                    });
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text)
        }

        function getSafeUrl(widget){
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

    }
})();