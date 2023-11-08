const ProductCategory = require("../model/productCategory.model.js");
const source_file = "ProductCategoryController";
const utils = require("../helper/utils");



// Create and Save a new ProductCategory
exports.create = (req, res) => {
  // Validate request

  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a ProductCategory
  const productCategory = new ProductCategory({
    categoryName : req.body.categoryName,
    creationTime : new Date().toISOString().slice(0, 19).replace('T', ' ')
  
  });

  // Save ProductCategory in the database
  ProductCategory.create(productCategory, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the productCategory."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {

  console.log("its inside product category   ")

  ProductCategory.getAll( (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    else res.send(data);
  });
};

// Find a single ProductCategory by Id
exports.findOne = (req, res) => {
  console.log(req.params);
  ProductCategory.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ProductCategory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ProductCategory with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a ProductCategory identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  ProductCategory.updateById(
    req.params.id,
    new ProductCategory(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ProductCategory with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ProductCategory with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a ProductCategory with the specified id in the request
exports.delete = (req, res) => {
  ProductCategory.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ProductCategory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete ProductCategory with id " + req.params.id
        });
      }
    } else res.send({ message: `ProductCategory was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  ProductCategory.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};