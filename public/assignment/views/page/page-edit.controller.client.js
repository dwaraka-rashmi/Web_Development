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
            PageService
                .findPageById(vm.pageId)
                .then(
                    function(response){
                        vm.page = response.data;
                    },
                    function(response){
                        vm.error = "Unable to fetch the Page";
                    })
        }
        init();

        function deletePage(pageId){

            PageService
                .deletePage(pageId)
                .then(
                    function(response){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    },
                    function(response){
                        vm.error = "Unable to delete Page";
                    });
        }

        function updatePage(page){

            PageService
                .updatePage(vm.pageId,page)
                .then(
                    function(response){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page")
                    },
                    function(response){
                        vm.error = "update failed!";
                    }
                )
        }

    }
})();