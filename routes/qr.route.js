    const Qr = require("../controller/qrHistory.controller");
    const router = require('express').Router();


  
    // Create a new QrHistory
    router.post("/", Qr.create);

    // Retrieve all Qr
    router.get("/", Qr.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Qr.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Qr.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Qr.delete);
  
    // Delete all Qr
    router.delete("/", Qr.deleteAll);
  
    module.exports = router;
