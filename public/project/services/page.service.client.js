/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        // createPage(websiteId, page) adds the page parameter instance to the local pages array. The new
        //     page's websiteId is set to the websiteId parameter
        function createPage(websiteId,page){
            if(page.name === undefined)
                return null;
            var newPage = {
                //_id: (new Date()).getTime()+"",
                name: page.name,
                description: page.description,
                websiteId : websiteId
            }
            var newPage = $http.post("/api/website/"+websiteId+"/page",newPage);
            return newPage;

        }

        // findPageByWebsiteId(websiteId) retrieves the pages in local pages array whose websiteId matches
        // the parameter websiteId
        function findPageByWebsiteId(websiteId){

            var pages = $http.get("/api/website/"+websiteId+"/page");
            return pages;
        }

        // findPageById(pageId) retrieves the page in local pages array whose _id matches the pageId parameter
        function findPageById(pageId){

            var page = $http.get("/api/page/"+pageId);
            return page;
        }

        // updatePage(pageId, page) updates the page in local pages array whose _id matches the pageId parameter
        function updatePage(pageId, page){

            var page = $http.put("/api/page/"+pageId,page);
            return page;
        }

        // deletePage(pageId) removes the page from local pages array whose _id matches the pageId parameter
        function deletePage(pageId){

            var result = $http.delete("/api/page/"+pageId);
            return result;
        }

    }

})();