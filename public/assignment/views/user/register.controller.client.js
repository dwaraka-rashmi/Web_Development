/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);
    function RegisterController($scope){
        $scope.hello ="Hello from Login Controller";
    }
})();