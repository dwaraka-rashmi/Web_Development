/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function(app,models){

    var categoryModelProject = models.categoryModelProject;

    app.get("/api/AllCategories/", getAllCategories);
    app.put("/api/category/", updateCategory);
    app.get("/api/category/:id", getCategoryById);
    app.post("/api/category/", createCategory);
    app.get("/api/category/", getCategoryByName);
    app.delete("/api/category/:id", deleteCategory);

    function getCategoryByName(req,res){
        var category = req.query.category;
        categoryModelProject
            .findByCategoryName(category)
            .then(
                function(category){
                    res.json(category);
                },
                function(error){
                    res.json({});
                });
    }

    function deleteCategory(req,res){
        var categoryId = req.params.id;
        categoryModelProject
            .deleteCategory(categoryId)
            .then(
                function(category){
                    res.json(200);
                },
                function(error){
                    res.json(400);
                });
    }

    function getCategoryById(req,res){
        var categoryId = req.params.id;
        categoryModelProject
            .findCategoryById(categoryId)
            .then(
                function(category){
                    res.json(category);
                },
                function(error){
                    res.json({});
                });
    }
    
    function updateCategory(req,res){
        
        var category = req.body;
        categoryModelProject
            .updateCategory(category._id,category)
            .then(
                function(category){
                    res.json(category);
                },
                function(error){
                    res.json({});
                }
            )
    }

    function createCategory(req,res){

        var category = req.body;
        categoryModelProject
            .createCategory(category)
            .then(
                function(category){
                    res.json(category);
                },
                function(error){
                    res.json({});
                }
            )
    }

    function getAllCategories(req,res){
        categoryModelProject
            .findAllCategories()
            .then(
                function(categories){
                    console.log(categories);
                    res.json(categories);
                },
                function(error){
                    console.log(error);
                    res.json(400);
                });
    }
    
};