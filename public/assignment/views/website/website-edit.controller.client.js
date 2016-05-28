/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController);
    function EditWebsiteController($location,$routeParams,WebsiteService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init(){
            vm.webiste = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite(websiteId){
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result){
                $location.url("/user/"+vm.userId+"/website");
            }
            else {
                vm.error = "Unable to delete website"
            }
        }

        function updateWebsite(website){
            vm.website = WebsiteService.updateWebsite(vm.websiteId,vm.website);
            if(!vm.website){
                $location.url("/user/"+vm.userId+"/website");
            }
            else {
                vm.error = "update failed!";
            }

        }

    }
})();