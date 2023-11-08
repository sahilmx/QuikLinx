    const GenuineMarkUsage = require("../controller/genuineMarkUsageUsage.controller");
    const router = require('express').Router();

    
  
    // Create a new Tutorial
    router.get("/get", GenuineMarkUsage.findAll);

    // Create a new Tutorial
    router.post("/add", GenuineMarkUsage.create);

    // Retrieve all GenuineMarkUsage
    router.post("/login", GenuineMarkUsage.verifyAndAuthorize);

    //Update the rewardify options 
    router.put("/:id", GenuineMarkUsage.update);

    // Logout a admin
    router.post("/logout", GenuineMarkUsage.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", GenuineMarkUsage.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", GenuineMarkUsage.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", GenuineMarkUsage.delete);
  
    // Delete all GenuineMarkUsage
    router.delete("/", GenuineMarkUsage.deleteAll);
  
    module.exports = router;
