    const RewardifyHistory = require("../controller/rewardHistory.controller");
    const router = require('express').Router();


    
    // Create a new QrHistory
    router.post("/", RewardifyHistory.create);

    // Retrieve all RewardifyHistory
    router.get("/", RewardifyHistory.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", RewardifyHistory.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", RewardifyHistory.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", RewardifyHistory.delete);
  
    // Delete all RewardifyHistory
    router.delete("/", RewardifyHistory.deleteAll);
  
    module.exports = router;
