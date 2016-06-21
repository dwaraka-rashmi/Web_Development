/**
 * Created by Rashmi_Dwaraka on 5/25/2016.
 */
(function() {
    angular
        .module("BestShop",["ngRoute"])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
})();

