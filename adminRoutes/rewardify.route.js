    const Rewardify = require("../controller/rewardify.controller");
    const router = require('express').Router();

    
  

    // Create a new Tutorial
    router.get("/get", Rewardify.findAll);

    // Create a new Tutorial
    router.post("/add", Rewardify.create);

    // Retrieve all Rewardify
    router.post("/login", Rewardify.verifyAndAuthorize);

    //Update the rewardify options 
    router.put("/:id", Rewardify.update);

  
    // Logout a admin
    router.post("/logout", Rewardify.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Rewardify.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Rewardify.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Rewardify.delete);
  
    // Delete all Rewardify
    router.delete("/", Rewardify.deleteAll);
  
    module.exports = router;
