/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService) {
        var vm = this;

        vm.searchPhotos = searchPhotos;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response){
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }
    }
})();
// (function(){
//     angular
//         .module("WebAppMaker")
//         .controller("FlickrImageSearchController",FlickrImageSearchController);
//
//     function FlickrImageSearchController($sce,$routeParams,FlickrService){
//
//         var vm = this;
//         vm.searchPhotos = searchPhotos;
//
//         vm.searchPhotos = function(searchTerm) {
//             FlickrService
//                 .searchPhotos(searchTerm)
//                 .then(function(response) {
//                     data = response.data.replace("jsonFlickrApi(","");
//                     data = data.substring(0,data.length - 1);
//                     data = JSON.parse(data);
//                     vm.photos = data.photos;
//                 });
//         }
//
//         // vm.userId = $routeParams.uid;
//         // vm.websiteId = $routeParams.wid;
//         // vm.pageId = $routeParams.pid;
//         // vm.getSafeHtml = getSafeHtml;
//         // vm.getSafeUrl = getSafeUrl;
//         // vm.error = false;
//         //
//         // function init(){
//         //     vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
//         // }
//         // init();
//         //
//         // function getSafeHtml(widget){
//         //     return $sce.trustAsHtml(widget.text)
//         // }
//         //
//         // function getSafeUrl(widget){
//         //     var urlParts = widget.url.split("/");
//         //     var id = urlParts[urlParts.length - 1];
//         //     var url = "https://www.youtube.com/embed/"+id;
//         //     return $sce.trustAsResourceUrl(url);
//         // }
//
//     }
// })();