/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function(app,models){

    var productModelProject = models.productModelProject;

    app.put("/api/product/",updateProduct);
    app.get("/api/product/:id",getProductById);
    app.post("/api/product/",createProduct);

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


};