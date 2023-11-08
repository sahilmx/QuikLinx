    const Product = require("../controller/product.controller");

    const router = require('express').Router();

    
  
    // Create a new Product 
    router.post("/", Product.create);

    // Retrieve all Product
    router.get("/", Product.findAll);

      // Retrieve all Product with category and subcategory name 
      router.get("/allDetails", Product.findAllFull);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Product.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Product.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Product.delete);
  
    // Delete all Product
    router.delete("/", Product.deleteAll);




  
    module.exports = router;
