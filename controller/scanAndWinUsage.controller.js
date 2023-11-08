const ScanAndWinUsage = require("../model/scanAndWinUsage.model");
const utils = require("../helper/utils");
const source_file = "ScanAndWinUsageController";

// Create and Save a new Product

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a new ScanAndWinUsage
  const scanAndWinOptions = new ScanAndWinUsage({
    vendor_id: req.body.vendor_id,
    options: req.body.options ,
   
  });

    await ScanAndWinUsage.create(scanAndWinOptions, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the ScanAndWinUsage Option .",
        });
      else
        res.send({
          success: true,
          data: data,
        });
    });
};


// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  ScanAndWinUsage.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving scanAndWinOptions .",
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database (with condition).



// Find a single Product by Id
exports.findOne = (req, res) => {
  ScanAndWinUsage.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ScanAndWinUsage with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving scanAndWinOptions with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Products
exports.findAllPublished = (req, res) => {
  ScanAndWinUsage.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    else res.send(data);
  });
};

// Update a Product identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  let updateDetails = new ScanAndWinUsage(req.body);
  updateDetails.updated_at = new Date();

  ScanAndWinUsage.updateById(req.params.id, updateDetails, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Product with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  ScanAndWinUsage.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.id,
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  ScanAndWinUsage.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
