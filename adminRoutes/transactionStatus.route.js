    const TxnStatus = require("../controller/tansactionStatus.controller");
    const router = require('express').Router();

    
  
    // Create a new Tutorial
    router.get("/get", TxnStatus.findAll);

    // Create a new Tutorial
    router.post("/add", TxnStatus.create);

    // Retrieve all TxnStatus

    //Update the rewardify options 
    router.put("/:id", TxnStatus.update);

  
    // Retrieve a single Tutorial with id
    router.get("/:id", TxnStatus.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", TxnStatus.update);
  
    // Delete a Tutorial with id
  
    // Delete all TxnStatus
  
    module.exports = router;
