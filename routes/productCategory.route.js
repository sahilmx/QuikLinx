    const ProductCategory = require("../controller/productCategory.controller");
    const router = require('express').Router();


    // Product Category 

    // Get all product Category 
    router.get("/",ProductCategory.findAll);

    // Get One Product Category 
    router.get("/:id",ProductCategory.findOne);


    // create a product category 
    router.post("/" ,ProductCategory.create);

    // delete a product category 
    router.delete("/:id",ProductCategory.delete);

    // Edit a Product Category 
    router.put("/:id",ProductCategory.update);
  
    module.exports = router;
