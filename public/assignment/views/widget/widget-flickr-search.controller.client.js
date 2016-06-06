/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController);

    function FlickrImageSearchController($location,$routeParams,FlickrService,WidgetService) {
        var vm = this;
        vm.userId=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.pageId=$routeParams.pid;
        vm.widgetId=$routeParams.wgid;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response){
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function(response){
                        vm.error="Unable to search Flickr";
                    });
<<<<<<< HEAD
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {
                websiteId : vm.websiteId,
                pageId : vm.pageId,
                widgetId : vm.widgetId,
                widgetType : 'IMAGE',
                url : url,
                userId : vm.userId
            };

            WidgetService
                .updateWidget(vm.widgetId,widget)
                .then(function(response){
                        var url = "/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId;
                        $location.url(url);
                        // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget"+vm.widgetId);
                    },
                    function(response){
                        vm.error = "Unable to select the picture";
                    });
=======
>>>>>>> ce7486c1cef70a8d39a4ead4a346ad385f7060fc
        }

    }
})();

