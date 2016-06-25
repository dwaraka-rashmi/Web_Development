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

    function UserSearchController($location,UserService,$window) {

        var vm = this;
        var id;
        if($window.sessionStorage.getItem("currentUser")) {
            var id = $window.sessionStorage.getItem("currentUser");
        }
        userId = id;
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
                        for (var i in usersRet) {
                            if(usersRet[i].pic === undefined){
                                usersRet[i].pic = "../project/images/profilePic.png";
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
                .searchUsers(searchText)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.users = response.data;
                        for(var i = 0;i<vm.users.length;i++){
                            if(!vm.users[i].pic){
                                vm.users[i].pic = "../project/images/profilePic.png";
                            }
                        }
                        if(vm.users.length===0){
                            vm.alert = "No users found";
                        }
                    },
                    function(response){
                        vm.error="Unable to search for users";
                    });
        }

        vm.logout = logout;

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $window.sessionStorage.setItem("currentUser",'0');
                        $window.sessionStorage.setItem("currentUsername",'0');
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = "Unable to logout";
                    });
        }

    }
})();

