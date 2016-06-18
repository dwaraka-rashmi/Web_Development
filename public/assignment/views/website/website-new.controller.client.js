/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",NewWebsiteController);
    function NewWebsiteController($location,$routeParams,WebsiteService){

        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;
        vm.error = false;

        function createWebsite(website){

            if(website) {
                WebsiteService
                    .createWebsite(vm.userId,website)
                    .then(
                        function(response){
                            if(response.data)
                                $location.url("/user/"+vm.userId+"/website");
                            else
                                vm.error = "Unable to create website";
                        },
                        function(error){
                            vm.error = "Unable to create website";
                        });
            }
            else {
                $("#website-name").css({'border-color' : 'lightcrimson'});
                vm.error = "Unable to create website";
            }
        }

    }
})();