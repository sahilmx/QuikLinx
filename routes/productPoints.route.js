const ProductPoints = require("../controller/ProductPoints.controller");
const router = require('express').Router();


// Product Category 

// Get all product Category 
router.get("/",ProductPoints.findAll);

// Get One Product Category 
router.get("/:id",ProductPoints.findOne);

router.get("/qrcode/:id",ProductPoints.findOneQrCode);

// create a product category 
router.post("/" ,ProductPoints.create);

// delete a product category 
router.delete("/:id",ProductPoints.delete);

// Edit a Product Category 
router.put("/:id",ProductPoints.update);

module.exports = router;
