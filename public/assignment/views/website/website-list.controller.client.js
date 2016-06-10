/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController);
    function WebsiteListController($routeParams,WebsiteService){

        var vm = this;
        vm.userId = $routeParams.uid;
        function init(){
            WebsiteService
                .findWebsitesByUser($routeParams.uid)
                .then(
                    function(response){
                        vm.websites=response.data;
                    },
                    function(response){
                        vm.error="Unable to fetch Websites";
                    });
        }
        init();
    }
})();