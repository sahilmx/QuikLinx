const GiftRedemption = require("../model/giftRedemption.model.js");
const source_file = "Gift Redemption";
const utils = require("../helper/utils");


// Create and Save a new GiftRedemption
exports.create = (req, res) => {
  // Validate request

  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a GiftRedemption
  const giftRedemption = new GiftRedemption({


    user_id:req.body.user_id, 
    user_role:req.body.user_role,
    ref_no:req.body.ref_no,
    gifts:req.body.gifts,
    points_used:req.body.points_used,
    status:req.body.status,
    location:req.body.location,
    created_on:new Date(),
    updated_on:new Date()

  
  });

  // Save GiftRedemption in the database
  GiftRedemption.create(giftRedemption, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err || "Some error occurred while creating the GiftRedemption."
      });
    else res.send(data);
  });
};

// Retrieve all Gift History from the database (with condition).
exports.findAll = (req, res) => {

  console.log("its inside product category   ")

  GiftRedemption.getAll( (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Gift History."
      });
    else res.send(data);
  });
};

// Find a single GiftRedemption by Id
exports.findOne = (req, res) => {
  console.log(req.params);
  GiftRedemption.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found GiftRedemption with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving GiftRedemption with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a GiftRedemption identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  GiftRedemption.updateById(
    req.params.id,
    new GiftRedemption(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found GiftRedemption with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating GiftRedemption with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a GiftRedemption with the specified id in the request
exports.delete = (req, res) => {
  GiftRedemption.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found GiftRedemption with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete GiftRedemption with id " + req.params.id
        });
      }
    } else res.send({ message: `GiftRedemption was deleted successfully!` });
  });
};

// Delete all Gift History from the database.
exports.deleteAll = (req, res) => {
  GiftRedemption.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Gift History."
      });
    else res.send({ message: `All Gift History were deleted successfully!` });
  });
};