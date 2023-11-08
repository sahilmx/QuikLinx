const CategoryPoints = require("../controller/CategoryPoints.controller");
const router = require('express').Router();


// Product Category 

// Get all product Category 
router.get("/",CategoryPoints.findAll);

// Get One Product Category 
router.get("/:id",CategoryPoints.findOne);


// create a product category 
router.post("/" ,CategoryPoints.create);

// delete a product category 
router.delete("/:id",CategoryPoints.delete);

// Edit a Product Category 
router.put("/:id",CategoryPoints.update);

module.exports = router;
