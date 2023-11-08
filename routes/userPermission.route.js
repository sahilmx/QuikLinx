    const UserRole = require("../controller/userPermission.controller");
    const router = require('express').Router();


    // Product Category 

    // Get all product Category 
    router.get("/",UserRole.findAll);

    // Get One Product Category 
    router.get("/:id",UserRole.findOne);


    // create a product category 
    router.post("/" ,UserRole.create);

    // delete a product category 
    router.delete("/:id",UserRole.delete);

    // Edit a Product Category 
    router.put("/:id",UserRole.update);
  
    module.exports = router;
