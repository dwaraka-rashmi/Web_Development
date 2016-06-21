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
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })
            .when("/product/search", {
                templateUrl: "views/ProductSearch/product-search.client.html",
                controller: "ProductSearchController",
                controllerAs: "model"
            })
            .when("/product/:pid", {
                templateUrl: "views/ProductSearch/product-detail.client.html",
                controller: "ProductController",
                controllerAs: "model"
            })
            .when("/user/search",{
                templateUrl: "views/user/userSearch.view.client.html",
                controller: "UserSearchController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/userProfile.view.client.html",
                controller: "UserProfileController",
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