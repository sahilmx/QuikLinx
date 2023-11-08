    const Dwan = require("../controller/dwan.controller");
    const router = require('express').Router();

    
  

    // Create a new Tutorial
    router.get("/get", Dwan.findAll);

    // Create a new Tutorial
    router.post("/add", Dwan.create);

    //Update the rewardify options 
    router.put("/:id", Dwan.update);

  
    // Logout a admin
    router.post("/logout", Dwan.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Dwan.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Dwan.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Dwan.delete);
  
    // Delete all Dwan
    router.delete("/", Dwan.deleteAll);
  
    module.exports = router;
