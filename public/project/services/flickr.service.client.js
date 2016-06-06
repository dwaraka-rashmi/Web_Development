/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
// var key = "68bfd17e73797b2659840bf9718c7cc2";
// var secret = "cd7b96ec9833ec7b";
(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "68bfd17e73797b2659840bf9718c7cc2";
    var secret = "cd7b96ec9833ec7b";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();