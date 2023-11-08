    const ScanAndWinUsage = require("../controller/scanAndWinUsage.controller");
    const router = require('express').Router();

    
  
    // Create a new Tutorial
    router.get("/get", ScanAndWinUsage.findAll);

    // Create a new Tutorial
    router.post("/add", ScanAndWinUsage.create);

    //Update the rewardify options 
    router.put("/:id", ScanAndWinUsage.update);

    // Logout a admin
    router.post("/logout", ScanAndWinUsage.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", ScanAndWinUsage.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", ScanAndWinUsage.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", ScanAndWinUsage.delete);
  
    // Delete all ScanAndWinUsage
    router.delete("/", ScanAndWinUsage.deleteAll);
  
    module.exports = router;
