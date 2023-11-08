const Batch = require("../model/batch.model");
const source_file = "batchController";
const utils = require("../helper/utils");


// Create and Save a new Product

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Product
  const batch = new Batch({
    b_name: req.body.b_name,
    b_creation: new Date(),
  });

  
  // Save Product in the database
  await Batch.create(batch, (err, data) => {
    if (err)
      {
        res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Batch .",
      });
      utils.handleError(err, "create", source_file);

    }
    else
      res.send({
        success:true,
        data: data,
      });
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Batch.getAllBatches(title, (err, data) => {
    if (err)
      {res.status(500).send({
        message: err.message || "Some error occurred while retrieving batch .",
      });
      utils.handleError(err, "create", source_file);
    }
    else res.send(data);
  });
};

// Find a single Product by Id
exports.findOne = (req, res) => {
  Batch.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        utils.handleError(err, "create", source_file);

        res.status(404).send({
          message: `Not found Batch with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving batch with id " + req.params.id,
        });
        utils.handleError(err, "create", source_file);

      }
    } else res.send(data);
  });
};

// find all published Products
exports.findAllPublished = (req, res) => {
  Batch.getAllPublished((err, data) => {
    if (err)
      {res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
      utils.handleError(err, "create", source_file);

    }
    else res.send(data);
  });
};

// Update a Product identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    utils.handleError(err, "create", source_file);
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Batch.updateById(req.params.id, new Batch(req.body), (err, data) => {
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
  Batch.remove(req.params.id, (err, data) => {
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
  Batch.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
