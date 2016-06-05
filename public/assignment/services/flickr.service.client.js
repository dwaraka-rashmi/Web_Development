/**
 * Created by Rashmi_Dwaraka on 5/31/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    var key = "";
    var secret = "cd7b96ec9833ec7b";
    // var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
    var urlBase = "//api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){
        var api = {
            searchPhotos : searchPhotos
        };
        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            var photos = $http.get(url);
            console.log(photos);
            return photos;
        }
    }
})();