const GiftRedemption = require("../controller/giftRedemption.controller");
const router = require('express').Router();


// Product Category 

// Get all product Category 
router.get("/",GiftRedemption.findAll);

// Get One Product Category 
router.get("/:id",GiftRedemption.findOne);


// create a product category 
router.post("/" ,GiftRedemption.create);

// delete a product category 
router.delete("/:id",GiftRedemption.delete);

// Edit a Product Category 
router.put("/:id",GiftRedemption.update);

module.exports = router;
