/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456"},
        {"_id": "432", "name": "Post 2", "websiteId": "456"},
        {"_id": "543", "name": "Post 3", "websiteId": "456"}
    ];

    function PageService() {

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
        function createPage(websiteId,name,description){
            if(name === undefined)
                return null;
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                description: description,
                websiteId : websiteId
            }
            pages.push(newPage);
            return newPage;

        }

        // findPageByWebsiteId(websiteId) retrieves the pages in local pages array whose websiteId matches
        // the parameter websiteId
        function findPageByWebsiteId(websiteId){
            var pageList = [];
            for(var i in pages){
                if(pages[i].websiteId === websiteId){
                    pageList.push(pages[i]);
                }
            }
            return pageList;
        }

        // findPageById(pageId) retrieves the page in local pages array whose _id matches the pageId parameter
        function findPageById(pageId){
            for(var i in pages){
                if(pages[i]._id === pageId){
                    return pages[i];
                }
            }
            return null;

        }

        // updatePage(pageId, page) updates the page in local pages array whose _id matches the pageId parameter
        function updatePage(pageId, page){

        }

        // deletePage(pageId) removes the page from local pages array whose _id matches the pageId parameter
        function deletePage(pageId){

        }

    }

})();

