const CompanySetting = require("../controller/companySetting.controller");
const router = require('express').Router();


// Product Category 

// Get all product Category 
router.get("/",CompanySetting.findAll);

// Get One Product Category 
router.get("/:id",CompanySetting.findOne);


// create a product category 
router.post("/" ,CompanySetting.create);

// delete a product category 
router.delete("/:id",CompanySetting.delete);

// Edit a Product Category 
router.put("/:id",CompanySetting.update);

module.exports = router;
