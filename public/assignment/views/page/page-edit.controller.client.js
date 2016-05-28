/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController);
    function EditPageController($location,$routeParams,PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init(){
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function deletePage(pageId){
            var result = PageService.deletePage(pageId);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page")
            }
            else {
                vm.error = "Unable to delete website"
            }

        }

        function updatePage(page){
            var result = PageService.updatePage(vm.pageId,page);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page")
            }
            else {
                vm.error = "update failed!";
            }

        }

    }
})();