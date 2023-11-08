    const Batch = require("../controller/batch.controller");
    const router = require('express').Router();

    
  
    // Create a new Tutorial
    router.post("/", Batch.create);

  
    // Retrieve all Batch
    router.get("/", Batch.findAll);
  
    // Retrieve all published Batch
    router.get("/published", Batch.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Batch.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Batch.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Batch.delete);
  
    // Delete all Batch
    router.delete("/", Batch.deleteAll);
  
    module.exports = router;
