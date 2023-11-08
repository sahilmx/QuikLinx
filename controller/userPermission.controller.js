const UserRole = require("../model/userPermission.model.js");
const source_file = "User Permission Controller";
const utils = require("../helper/utils");



// Create and Save a new UserRole
exports.create = (req, res) => {
  // Validate request

  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a UserRole
  const userRole = new UserRole({
      
    name :req.body.name,      
    permissions: req.body.permissions || {},
    created_on :new Date(),  
  });

  // Save UserRole in the database
  UserRole.create(userRole, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the userRole."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {

  console.log("its inside product category   ")

  UserRole.getAll( (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    else res.send(data);
  });
};

// Find a single UserRole by Id
exports.findOne = (req, res) => {
  console.log(req.params);
  UserRole.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found UserRole with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving UserRole with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a UserRole identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  UserRole.updateById(
    req.params.id,
    new UserRole(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found UserRole with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating UserRole with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a UserRole with the specified id in the request
exports.delete = (req, res) => {
  UserRole.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found UserRole with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete UserRole with id " + req.params.id
        });
      }
    } else res.send({ message: `UserRole was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  UserRole.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};