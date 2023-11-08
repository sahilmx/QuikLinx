const GenuineMark = require("../model/genuinemark.model");
const utils = require("../helper/utils");
const source_file = "genuinemarkController";

// Create and Save a new Product

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a new GenuineMark
  const genuineMarkOption = new GenuineMark({
    option_name: req.body.option_name,
    sub_option_array: req.body.sub_option_array,
    creation_date: new Date(),
    updation_date: new Date()
  });

    await GenuineMark.create(genuineMarkOption, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the GenuineMark Option .",
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
    const admin_data = await GenuineMark.get(["id", "password", "isValid"], {
      email,
    });

    if (!admin_data || !admin_data.id) {
      res.send({
        success: false,
        message: "There is no genuineMarkOption with this email",
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

  GenuineMark.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving genuineMarkOption .",
      });
    else res.send(data);
  });
};

// Find a single Product by Id
exports.findOne = (req, res) => {
  GenuineMark.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found GenuineMark with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving genuineMarkOption with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Products
exports.findAllPublished = (req, res) => {
  GenuineMark.getAllPublished((err, data) => {
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
  let updateDetails = new GenuineMark(req.body);
  updateDetails.updation_date = new Date();

  GenuineMark.updateById(req.params.id, updateDetails, (err, data) => {
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
  GenuineMark.remove(req.params.id, (err, data) => {
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
  GenuineMark.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
