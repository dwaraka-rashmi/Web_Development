/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */
/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("UserSearchController",UserSearchController);

    function UserSearchController($location,$routeParams,UserService,$rootScope) {

        var vm = this;
        var userId = $rootScope.currentUser._id;
        vm.searchUsers = searchUsers;
        
        function init(){
            UserService
                .findUsers()
                .then(
                    function(response){
                        var usersRet = response.data;
                        for (var i in usersRet) {
                           if (usersRet[i]._id === userId) {
                               usersRet.splice(i,1);
                           }
                        }
                        vm.users = usersRet;
                    },
                    function(error){
                        vm.error = "Unable to access users data";
                    });
        }
        init();

        function searchUsers(searchText) {
            UserService
                .searchUsers(searchText,userId)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.users = response.data;
                    },
                    function(response){
                        vm.error="Unable to search Flickr";
                    });
        }
     
    }
})();

