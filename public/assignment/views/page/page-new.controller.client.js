/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController);
    function NewPageController($location,$routeParams,PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(page){

            if(page){
                PageService
                    .createPage(vm.websiteId,page)
                    .then(
                        function(response){
                            if(response.data._id)
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                            else
                                vm.error = "Unable to create Page";
                        });
            }
            else {
                $("#page-name").css({'border' : 'lightcrimson'});
                vm.error = "Unable to create Page";
            }
        }

    }
})();