const RewardifyHistory = require("../model/rewardsHistory.model");
const source_file = "RewardHistoryController";
const utils = require("../helper/utils");


const {v4 : uuidv4} = require('uuid')

// Create and Save a new RewardifyHistory
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a RewardifyHistory
  const rewardifyHistory = new RewardifyHistory({
    user_id : req.body.user_id,
    user_type : req.body.user_type,
    latitude : req.body.latitude || 0,
    longitude : req.body.longitude ||0,
    qrcode_id : req.body.qrcode_id,
    scan_type : req.body.scan_type ||0,
    platform : req.body.platform ||'WEB',
    name : req.body.name || '',
    created_on : new Date()

  });
  const pp= req.body.product_points;
  // Save RewardifyHistory in the database
  RewardifyHistory.create(rewardifyHistory,pp, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the RewardifyHistory."
      });
    else res.send(data);
  });
};

// Retrieve all Qrs from the database (with condition).
exports.findAll = (req, res) => {
  //const title = req.query.title;
  // RewardifyHistory.getAll(title, (err, data) => {

  RewardifyHistory.getAll("", (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qrs."
      });
    else res.send(data);
  });
};

// Find a single RewardifyHistory by Id
exports.findOne = (req, res) => {
  RewardifyHistory.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found RewardifyHistory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving RewardifyHistory with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Qrs
exports.findAllPublished = (req, res) => {
  RewardifyHistory.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qrs."
      });
    else res.send(data);
  });
};

// Update a RewardifyHistory identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  RewardifyHistory.updateById(
    req.params.id,
    new RewardifyHistory(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found RewardifyHistory with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating RewardifyHistory with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a RewardifyHistory with the specified id in the request
exports.delete = (req, res) => {
  RewardifyHistory.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found RewardifyHistory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete RewardifyHistory with id " + req.params.id
        });
      }
    } else res.send({ message: `RewardifyHistory was deleted successfully!` });
  });
};

// Delete all Qrs from the database.
exports.deleteAll = (req, res) => {
  RewardifyHistory.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Qrs."
      });
    else res.send({ message: `All Qrs were deleted successfully!` });
  });
};