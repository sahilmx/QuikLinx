    const RewardifyUsage = require("../controller/rewardifyUsage.controller");
    const router = require('express').Router();

    
  
    // Create a new Tutorial
    router.get("/get", RewardifyUsage.findAll);

    // Create a new Tutorial
    router.post("/add", RewardifyUsage.create);

    // Retrieve all RewardifyUsage
    router.post("/login", RewardifyUsage.verifyAndAuthorize);

    //Update the rewardify options 
    router.put("/:id", RewardifyUsage.update);

    // Logout a admin
    router.post("/logout", RewardifyUsage.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", RewardifyUsage.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", RewardifyUsage.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", RewardifyUsage.delete);
  
    // Delete all RewardifyUsage
    router.delete("/", RewardifyUsage.deleteAll);
  
    module.exports = router;
