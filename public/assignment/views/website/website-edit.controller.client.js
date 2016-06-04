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
        vm.error = false;
        function init(){
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(
                    function(response){
                        vm.website = response.data;
                    },
                    function(response){
                        vm.error="Unable to fetch the website";
                    });
        }
        init();

        function deleteWebsite(websiteId){
            WebsiteService
                .deleteWebsite(websiteId)
                .then(
                    function(response){
                        $location.url("/user/"+vm.userId+"/website");
                    },
                    function(response){
                        vm.error = "Unable to delete website";
                    });
        }

        function updateWebsite(website){
            WebsiteService
                .updateWebsite(website)
                .then(
                    function(response){
                        //vm.website = response.data;
                        $location.url("/user/"+vm.userId+"/website");
                    },
                    function(response){
                        vm.error = "update failed!";
                    });
        }

    }
})();