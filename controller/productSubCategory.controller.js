const ProductSubCategory = require("../model/productSubCategory.model.js");
const source_file = "Prod Sub Category Controller";
const utils = require("../helper/utils");



// Create and Save a new ProductSubCategory
exports.create = (req, res) => {
  // Validate request

  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a ProductSubCategory
  const productSubCategory = new ProductSubCategory({
    productCategory: req.body.productCategory,
    subCategoryName : req.body.subCategoryName,
    creationTime : new Date().toISOString().slice(0, 19).replace('T', ' ')
  });

  // Save ProductSubCategory in the database
  ProductSubCategory.create(productSubCategory, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ProductSubCategory.",
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {

  ProductSubCategory.getAll( (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    else res.send(data);
  });
};
exports.findAllInSameCat = (req, res) => {
  ProductSubCategory.findCatById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ProductSubCategory with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ProductSubCategory with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Find a single ProductSubCategory by Id
exports.findOne = (req, res) => {
  ProductSubCategory.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ProductSubCategory with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ProductSubCategory with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};


// Update a ProductSubCategory identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  ProductSubCategory.updateById(req.params.id, new ProductSubCategory(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ProductSubCategory with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating ProductSubCategory with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a ProductSubCategory with the specified id in the request
exports.delete = (req, res) => {
  ProductSubCategory.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ProductSubCategory with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete ProductSubCategory with id " + req.params.id,
        });
      }
    } else res.send({ message: `ProductSubCategory was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  ProductSubCategory.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
