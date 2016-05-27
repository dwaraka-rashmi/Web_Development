/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController);
    function PageListController($routeParams,PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        
        function init(){
            vm.pages = PageService.findPageByWebsiteId($routeParams.wid);
        }
        init();

    }
})();