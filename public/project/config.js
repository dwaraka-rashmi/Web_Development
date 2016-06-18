/**
 * Created by Rashmi_Dwaraka on 5/25/2016.
 */
(function() {
    angular
        .module("BestShop")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl: "views/home.html"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })
            .when("/user/product", {
                templateUrl: "views/ProductSearch/product-search.client.html",
                controller: "ProductSearchController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/login"
            });

        function checkLoggedIn(UserService,$location,$q,$rootScope){
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(response){
                        var user = response.data;
                        // console.log(user);
                        if(user ==  '0'){
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err){
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }
    }
})();