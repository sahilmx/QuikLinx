const Qr = require("../model/qr.model");
const {v4 : uuidv4} = require('uuid')
const source_file = "QRController";
const utils = require("../helper/utils");



// Create and Save a new Qr
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Generate the QR codes


  const qrCode = new Qr({
    qr_type: 2,
    b_id: req.body.b_name,
    qr_parent_id: null,
    qr_creation: new Date(),
    unique_id:uuidv4() ,
  });



  // Create a Qr
  const qr = new Qr({
    batch_id : req.body.batch_id,
    qr_count : req.body.qr_count,
    product_id:req.body.product_id,
    creation : new Date().toISOString().slice(0, 19).replace('T', ' '),
  });

  // Save Qr in the database
  Qr.create(qr, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Qr."
      });
    else res.send(data);
  });
};

// Retrieve all Qrs from the database (with condition).
exports.findAll = (req, res) => {
  //const title = req.query.title;
  // Qr.getAll(title, (err, data) => {

  Qr.getAll("", (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qrs."
      });
    else res.send(data);
  });
};

// Find a single Qr by Id
exports.findOne = (req, res) => {
  Qr.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Qr with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Qr with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Qrs
exports.findAllPublished = (req, res) => {
  Qr.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qrs."
      });
    else res.send(data);
  });
};

// Update a Qr identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Qr.updateById(
    req.params.id,
    new Qr(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Qr with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Qr with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Qr with the specified id in the request
exports.delete = (req, res) => {
  Qr.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Qr with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Qr with id " + req.params.id
        });
      }
    } else res.send({ message: `Qr was deleted successfully!` });
  });
};

// Delete all Qrs from the database.
exports.deleteAll = (req, res) => {
  Qr.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Qrs."
      });
    else res.send({ message: `All Qrs were deleted successfully!` });
  });
};