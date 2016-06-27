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
            if(!$window.sessionStorage.getItem("currentUser")){
                vm.logAlert = true;
            }

            var searchText = $window.sessionStorage.getItem("userSearch");
            vm.searchText=searchText;
            if(!searchText) {
                UserService
                    .findUsers()
                    .then(
                        function (response) {
                            var usersRet = response.data;
                            var users = usersRet;
                            for (var i in users) {
                                if (users[i]._id === userId || users[i].username === "admin") {
                                    usersRet.splice(i, 1);
                                }
                            }
                            for (var i in usersRet) {
                                if (usersRet[i].pic === undefined) {
                                    usersRet[i].pic = "../project/images/profilePic.png";
                                }
                            }
                            vm.users = usersRet;
                        },
                        function (error) {
                            vm.error = "Unable to access users data";
                        });
            }
            else{
                searchUsers(searchText);
            }
        }
        init();

        function searchUsers(searchText) {
            $window.sessionStorage.setItem("userSearch",searchText);
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
                        $window.sessionStorage.clear();
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = "Unable to logout";
                    });
        }

    }
})();

