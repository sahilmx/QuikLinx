    const ScanAndWin = require("../controller/scanAndWin.controller");
    const router = require('express').Router();

    
  

    // Create a new Tutorial
    router.get("/get", ScanAndWin.findAll);

    // Create a new Tutorial
    router.post("/add", ScanAndWin.create);

    //Update the rewardify options 
    router.put("/:id", ScanAndWin.update);

  
    // Logout a admin
    router.post("/logout", ScanAndWin.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", ScanAndWin.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", ScanAndWin.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", ScanAndWin.delete);
  
    // Delete all ScanAndWin
    router.delete("/", ScanAndWin.deleteAll);
  
    module.exports = router;
