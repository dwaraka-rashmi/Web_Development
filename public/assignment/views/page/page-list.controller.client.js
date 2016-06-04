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
            PageService
                .findPageByWebsiteId($routeParams.wid)
                .then(
                    function(response){
                        vm.pages = response.data;
                    },
                    function(response){
                        vm.error = "Unable to fetch pages";
                    });
        }
        init();

    }
})();