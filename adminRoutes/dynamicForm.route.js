    const DynamicForm = require("../controller/dynamicForm.controller");
    const router = require('express').Router();

    
  
    // Create a new Tutorial
    router.get("/get", DynamicForm.findAll);

    // Create a new Tutorial
    router.post("/add", DynamicForm.create);

    //Update the rewardify options 
    router.put("/:id", DynamicForm.update);

    // Logout a admin
    router.post("/logout", DynamicForm.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", DynamicForm.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", DynamicForm.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", DynamicForm.delete);
  
    // Delete all DynamicForm
    router.delete("/", DynamicForm.deleteAll);
  
    module.exports = router;
