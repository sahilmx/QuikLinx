    const Industry = require("../controller/industry.controller");
    const router = require('express').Router();

    
  
    // Create a new Tutorial
    router.get("/get", Industry.findAll);

    // Create a new Tutorial
    router.post("/add", Industry.create);

    // Retrieve all Industry
    router.post("/login", Industry.verifyAndAuthorize);

    //Update the rewardify options 
    router.put("/:id", Industry.update);

  
    // Logout a admin
    router.post("/logout", Industry.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Industry.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Industry.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Industry.delete);
  
    // Delete all Industry
    router.delete("/", Industry.deleteAll);
  
    module.exports = router;
