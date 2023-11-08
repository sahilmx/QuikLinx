const CategoryPoints = require("../model/CategoryPoints.model.js");
const source_file = "categoryPoints";
const utils = require("../helper/utils");


// Create and Save a new CategoryPoints
exports.create = (req, res) => {
  // Validate request

  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a CategoryPoints
  const CategoryPoints = new CategoryPoints({
    cat_id: req.params.cat_id,
    sub_cat_id: req.params.sub_cat_id,
    points: req.body.points,
    status: req.body.status||true,
    start_date: req.body.start_date || new Date(),
    end_date: req.body.end_date || new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    user_type: req.body.user_type,
    created_by: req.body.user_id,
    created_at : new Date()
  
  });

  // Save CategoryPoints in the database
  CategoryPoints.create(CategoryPoints, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CategoryPoints."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {

  console.log("its inside product category   ")

  CategoryPoints.getAll( (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    else res.send(data);
  });
};

// Find a single CategoryPoints by Id
exports.findOne = (req, res) => {
  console.log(req.params);
  CategoryPoints.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CategoryPoints with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving CategoryPoints with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a CategoryPoints identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  CategoryPoints.updateById(
    req.params.id,
    new CategoryPoints(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found CategoryPoints with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating CategoryPoints with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a CategoryPoints with the specified id in the request
exports.delete = (req, res) => {
  CategoryPoints.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CategoryPoints with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete CategoryPoints with id " + req.params.id
        });
      }
    } else res.send({ message: `CategoryPoints was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  CategoryPoints.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};