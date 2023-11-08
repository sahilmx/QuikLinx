    const ProductSubCategory = require("../controller/productSubCategory.controller");
    const router = require('express').Router();



    // create a product category 
    router.post("/" ,ProductSubCategory.create);

    // delete a product category 
    router.delete("/:id",ProductSubCategory.delete);

    // Edit a Product Category 
    router.put("/:id",ProductSubCategory.update);

    // Get all product Category 
    router.get("/",ProductSubCategory.findAll);

    // Get One Product Category 
    router.get("/:id",ProductSubCategory.findOne);

    // get product sub category of a particular category 
    router.get("/subCat/:id",ProductSubCategory.findAllInSameCat);



  
    module.exports = router;
