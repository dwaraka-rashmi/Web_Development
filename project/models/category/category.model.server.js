/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var CategorySchemaProject = require("./category.schema.server")();
    var CategoryProject = mongoose.model("CategoryProject", CategorySchemaProject);

    var api = {
        createCategory: createCategory,
        updateCategory:updateCategory,
        findCategoryById:findCategoryById,
        findCategoryByCategoryId:findCategoryByCategoryId,
        findByCategoryName:findByCategoryName,
        deleteCategory:deleteCategory
    };
    return api;

    function findByCategoryName(name){
        return CategoryProject.find({"category":name});
    }

    function findCategoryById(categoryId){
        return CategoryProject.findById(categoryId);
    }
    
    function findCategoryByCategoryId(categoryId){
        return ProductProject.findOne({categoryId:categoryId});
    }
    
    function updateCategory(categoryId,category){
        delete category._id;
        return CategoryProject
            .update({_id: categoryId},{
                $set: category
            });
    }

    function createCategory(category){
        return CategoryProject.create(category);
    }

    function deleteCategory(categoryId){
        return CategoryProject.remove(categoryId);
    }
    
};