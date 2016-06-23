/**
 * Created by Rashmi_Dwaraka on 6/20/2016.
 */

module.exports = function(app,models){

    var productModelProject = models.productModelProject;

    // app.post("/api/user", createUser);
    // app.post("/api/register", register);
    // app.get("/api/user", getUsers);
    // app.get("/api/loggedIn", loggedIn);
    // app.post("/api/login", passport.authenticate('bs'), login);
    // app.post("/api/logout", logout);
    
    app.put("/api/product/",updateProduct);
    app.get("/api/product/:id",getProductById);
    app.post("/api/product/",createProduct);

    function getProductById(req,res){
        var itemId = req.params.id;
        productModelProject
            .getProductById(itemId)
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
    
    // function updateProduct(req,res){
    //     var product = req.body;
    //    
    //     // var product = {
    //     //     item : item,
    //     //     review : review,
    //     //     userId : userId
    //     // };
    //     // $http.put("/api/product/review",product);
    //     productModelProject
    //         .findProductByItemId(itemId)
    //         .then(
    //             function(item){
    //                 if(item){
    //                     var updatedItem = item;
    //                     var reviews = {
    //                         review: product.review,
    //                         _user: product.userId
    //                     }
    //                     updatedItem.productReviews.push(reviews);
    //                     productModelProject
    //                         .updateProduct(item._id,updatedItem)
    //                         .then(
    //                             function(resposne){
    //                                 res.json(200);
    //                             },
    //                             function(error){
    //                                 res.json(400);
    //                             });
    //                 }
    //                 else {
    //                     var newItem = {
    //                         name : product.item.name,
    //                         itemId:product.item.itemId,
    //                         productDetails: product.item,
    //                         productReviews:{
    //                             review: product.review,
    //                             _user: product.userId
    //                         }
    //                     };
    //                     productModelProject
    //                         .createProduct(newItem)
    //                         .then(
    //                             function(item){
    //                                 res.json(200);
    //                             },
    //                             function(error){
    //                                 res.json(400);
    //                             });
    //                 }
    //             },
    //             function(error){
    //                 res.json(error);
    //             }
    //         )
    // }


};