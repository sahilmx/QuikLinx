    const GenuineMark = require("../controller/genuinemark.controller");
    const router = require('express').Router();

    
  

    // Create a new Tutorial
    router.get("/get", GenuineMark.findAll);

    // Create a new Tutorial
    router.post("/add", GenuineMark.create);

    // Retrieve all GenuineMark
    router.post("/login", GenuineMark.verifyAndAuthorize);

    //Update the rewardify options 
    router.put("/:id", GenuineMark.update);

  
    // Logout a admin
    router.post("/logout", GenuineMark.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", GenuineMark.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", GenuineMark.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", GenuineMark.delete);
  
    // Delete all GenuineMark
    router.delete("/", GenuineMark.deleteAll);
  
    module.exports = router;
