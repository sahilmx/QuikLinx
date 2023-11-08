const Industry = require("../model/industry.model");
const utils = require("../helper/utils");
const source_file = "indusrtyController";

// Create and Save a new Product

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
          

  // Create a new Industry
  const industryOption = new Industry({
    i_name: req.body.i_name,
    i_users: req.body.i_users,
    created_at: new Date(),
    updated_at: new Date(),
   
  });

    await Industry.create(industryOption, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Industry Option .",
        });
      else
        res.send({
          success: true,
          data: data,
        });
    });
};

exports.verifyAndAuthorize = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const admin_data = await Industry.get(["id", "password", "isValid"], {
      email,
    });

    if (!admin_data || !admin_data.id) {
      res.send({
        success: false,
        message: "There is no industryOption with this email",
      });
      return;
    }

    if (admin_data.password != utils.getHash(password)) {
      res.send({
        success: false,
        message: "Password is incorrect",
      });
      return;
    }

    const { token } = utils.getToken(
      { user_id: admin_data.id, is_admin: true },
      process.env.ACCESS_TOKEN_IDRSA,
      "access_token",
    );
    res.send({ success: true, token, message: "LoggedIn successfully" });
  } catch (error) {
    console.log(error);
    utils.handleError(error, "verifyAndAuthorize", source_file);
    res.send({
      success: false,
      error: error,
    });
  }
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Industry.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving industryOption .",
      });
    else res.send(data);
  });
};

// Find a single Product by Id
exports.findOne = (req, res) => {
  Industry.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Industry with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving industryOption with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Products
exports.findAllPublished = (req, res) => {
  Industry.getAllPublished((err, data) => {
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
  let updateDetails = new Industry(req.body);

  Industry.updateById(req.params.id, updateDetails, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Industry with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Indusrtry with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  Industry.remove(req.params.id, (err, data) => {
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
  Industry.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
