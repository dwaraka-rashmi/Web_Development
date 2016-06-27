/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function(app,models){

    var productModelProject = models.productModelProject;

    app.put("/api/product/", updateProduct);
    app.get("/api/product/:id", getProductById);
    app.post("/api/product/", createProduct);
    app.get("/api/product/user/:userId", getProductByUser);
    app.delete("/api/product/delete/:pid", deleteProduct);


    function getProductById(req,res){
        var itemId = req.params.id;
        productModelProject
            .findProductByItemId(itemId)
            .then(
                function(item){
                    res.json(item);
                },
                function(error){
                    res.json({});
                });
    }
    
    function getProductByUser(req,res){
        var id = req.params.userId;
        productModelProject
            .findProductByUser(id)
            .then(
                function(items){
                    res.json(items);
                },
                function(error){
                    res.json(400);
                });
    }
    
    function updateProduct(req,res){
        
        var product = req.body;
        productModelProject
            .updateProduct(product._id,product)
            .then(
                function(item){
                    res.json(item);
                },
                function(error){
                    res.json({});
                }
            )
    }

    function createProduct(req,res){

        var product = req.body;
        productModelProject
            .createProduct(product)
            .then(
                function(item){
                    res.json(item);
                },
                function(error){
                    res.json({});
                }
            )
    }

    function deleteProduct(req,res){
        var productId = req.params.pid;
        productModelProject
            .deleteProduct(product)
            .then(
                function(response){
                    res.json(200);
                },
                function(error){
                    res.json(400);
                }
            )
    }


};