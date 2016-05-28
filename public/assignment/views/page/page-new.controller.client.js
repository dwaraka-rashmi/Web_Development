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
            var newPage = PageService.createPage(vm.websiteId,page);
            if(newPage){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else {
                vm.error = "Unable to create Page"
            }
        }
        
    }
})();