const ProductPoints = require("../model/ProductPoints.model.js");
const source_file = "ProductPointsController";
const utils = require("../helper/utils");



// Create and Save a new ProductPoints
exports.create = (req, res) => {
  // Validate request

  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a ProductPoints
  const productPoints = new ProductPoints({

    cat_id: req.body.cat_id,
    sub_cat_id: req.body.sub_cat_id,
    p_id: req.body.p_id,
    points: req.body.points,
    status: req.body.status||true,
    start_date: req.body.start_date || new Date(),
    end_date: req.body.end_date || new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    user_type: req.body.user_type,
    created_by: req.body.created_by,
    created_at : new Date()

  });
  
  // Save ProductPoints in the database
  ProductPoints.create(productPoints, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ProductPoints."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {

  console.log("its inside product category   ")

  ProductPoints.getAllWithAllInfo( (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    else res.send(data);
  });
};

// Find a single ProductPoints by Id
exports.findOne = (req, res) => {
  console.log(req.params);
  ProductPoints.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ProductPoints with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ProductPoints with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


exports.findOneQrCode = async (req, res) => {
  console.log(req.params);

  ProductPoints.findByQrCode(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ProductPoints with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ProductPoints with id " + req.params.id
        });
      }
    } else {
      console.log({data});
     
      res.send(data);
    }
  });
};


// Update a ProductPoints identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  ProductPoints.updateById(
    req.params.id,
    new ProductPoints(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ProductPoints with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ProductPoints with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a ProductPoints with the specified id in the request
exports.delete = (req, res) => {
  ProductPoints.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ProductPoints with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete ProductPoints with id " + req.params.id
        });
      }
    } else res.send({ message: `ProductPoints was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  ProductPoints.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};