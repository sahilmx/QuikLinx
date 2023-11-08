const ScanAndWin = require("../model/scanAndWin.model");
const utils = require("../helper/utils");
const source_file = "ScanAndWinController";

// Create and Save a new Product

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a new ScanAndWin
  const scanAndWinOptions = new ScanAndWin({
    option_name: req.body.option_name,
    sub_option_array: req.body.sub_option_array,
    creation_date: new Date(),
    updation_date: new Date()
  });

    await ScanAndWin.create(scanAndWinOptions, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the ScanAndWin Option .",
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

  ScanAndWin.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving scanAndWinOptions .",
      });
    else res.send(data);
  });
};

// Find a single Product by Id
exports.findOne = (req, res) => {
  ScanAndWin.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ScanAndWin with id ${req.params.id}.`,
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
  ScanAndWin.getAllPublished((err, data) => {
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
  let updateDetails = new ScanAndWin(req.body);
  updateDetails.updation_date = new Date();

  ScanAndWin.updateById(req.params.id, updateDetails, (err, data) => {
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
  ScanAndWin.remove(req.params.id, (err, data) => {
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
  ScanAndWin.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
