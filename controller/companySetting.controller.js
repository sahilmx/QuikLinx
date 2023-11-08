const CompanySetting = require("../model/companySetting.model");
const source_file = "Gift Redemption";
const utils = require("../helper/utils");


// Create and Save a new CompanySetting
exports.create = (req, res) => {
  // Validate request

  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a CompanySetting
  const companySetting = new CompanySetting({


    c_name : req.body.c_name,
    c_email : req.body.c_email,
    socials : req.body.socials,
    c_customer_care_email : req.body.c_customer_care_email,
    c_mobile : req.body.c_mobile,
    c_customer_care_mobile : req.body.c_customer_care_mobile,
    website : req.body.website,
    c_address : req.body.c_address,
    c_gstin : req.body.c_gstin,
    logo:req.body.logo,
    c_theme_colors : req.body.c_theme_colors,
    c_points_value : req.body.c_points_value,
    c_price_value : req.body.c_price_value,
    c_font_family : req.body.c_font_family,
    created_on:new Date(),
    updated_on:new Date()

  
  });

  // Save CompanySetting in the database
  CompanySetting.create(companySetting, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err || "Some error occurred while creating the CompanySetting."
      });
    else res.send(data);
  });
};

// Retrieve all Gift History from the database (with condition).
exports.findAll = (req, res) => {

  console.log("its inside product category   ")

  CompanySetting.getAll( (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Gift History."
      });
    else res.send(data);
  });
};

// Find a single CompanySetting by Id
exports.findOne = (req, res) => {
  console.log(req.params);
  CompanySetting.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CompanySetting with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving CompanySetting with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a CompanySetting identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  CompanySetting.updateById(
    req.params.id,
    new CompanySetting(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found CompanySetting with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating CompanySetting with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a CompanySetting with the specified id in the request
exports.delete = (req, res) => {
  CompanySetting.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CompanySetting with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete CompanySetting with id " + req.params.id
        });
      }
    } else res.send({ message: `CompanySetting was deleted successfully!` });
  });
};

// Delete all Gift History from the database.
exports.deleteAll = (req, res) => {
  CompanySetting.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Gift History."
      });
    else res.send({ message: `All Gift History were deleted successfully!` });
  });
};