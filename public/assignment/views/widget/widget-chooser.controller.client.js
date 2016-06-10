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

        vm.widgetTypes = [
            {text: "HEADER"},
            {text: "LABEL"},
            {text: "HTML"},
            {text: "TEXT INPUT"},
            {text: "LINK"},
            {text: "BUTTON"},
            {text: "IMAGE"},
            {text: "YOUTUBE"},
            {text: "DATA TABLE"},
            {text: "REPEATER"}
        ];
        vm.error = false;

        // function init(){
        //     WidgetService
        //         .findWidgetsByPageId(vm.pageId)
        //         .then(
        //             function(response){
        //                 vm.widgets = response.data;
        //             },
        //             function(response){
        //                 vm.error = "Unable to fetch Widgets";
        //             });
        // }
        // init();

        function createWidget(type){
            var widget = {
                widgetType:type
            };

            WidgetService
                .createWidget(vm.pageId,widget)
                .then(
                    function(response){
                        vm.widget = response.data;
                        if(vm.widget._id)
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
                        else
                            vm.error = "Unable to create a Widget";
                    });
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