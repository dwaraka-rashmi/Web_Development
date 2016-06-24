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
                templateUrl: "views/ProductHome/product-home.client.html",
                controller: "ProductHomeController",
                controllerAs: "model"
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
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })
            .when("/product/:pid", {
                templateUrl: "views/ProductSearch/product-detail.client.html",
                controller: "ProductController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })
            .when("/product/:pid/review", {
                templateUrl: "views/ProductSearch/product-review.client.html",
                controller: "ProductReviewController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })
            .when("/product/:pid/review/:uid", {
                templateUrl: "views/ProductSearch/product-add-review.client.html",
                controller: "ProductAddReviewController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })
            .when("/product/deal/:pid", {
                templateUrl: "views/ProductHome/product-deal-detail.client.html",
                controller: "ProductDealController",
                controllerAs: "model"
            })
            .when("/user/product", {
                templateUrl: "views/ProductSearch/product-saved.client.html",
                controller: "ProductSavedController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
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

        function checkLoggedIn(UserService,$location,$q,$rootScope,$window){
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(response){
                        var user = response.data;
                        // console.log(user);
                        if(user ==  '0'){
                            console.log(user._id);
                            $rootScope.currentUser = null;
                            $window.sessionStorage.setItem("currentUser",user._id);
                            $window.sessionStorage.setItem("currentUsername",user.username);
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            console.log(user._id);
                            $rootScope.currentUser = user;
                            $window.sessionStorage.setItem("currentUser",user._id);
                            $window.sessionStorage.setItem("currentUsername",user.username);
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