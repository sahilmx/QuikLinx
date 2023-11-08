const Admin = require("../model/admin.model");
const Admin_mongo = require("../model/admin.model_mongo");
const utils = require("../helper/utils");
const source_file = "adminController";
const Cookies = require("cookies");

// Create and Save a new Product

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a new Admin
  const admin = new Admin({
    email: req.body.email,
    password: utils.getHash(req.body.password),
    phone: req.body.phone,
    name: req.body.name,
    create_date: new Date(),
  });
  console.log("admin req called ",req.body);
  req.body.password=utils.getHash(req.body.password);
     const createAdmin = await Admin_mongo.create(req, res);

  // if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while creating the Admin .",
  //       });
  //     else
        // res.send({
        //   success: true,
        //   data: req.body,
        // });


  // const checkPresent = await Admin.checkPresent(admin);
  // if (checkPresent.success) {
  //   res.send({
  //     success: false,
  //     data: "admin already present ",
  //   });
  // } else {
  //   await Admin.create(admin, (err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while creating the Admin .",
  //       });
  //     else
  //       res.send({
  //         success: true,
  //         data: data,
  //       });
    // });
  // }
};

exports.verifyAndAuthorize = async (req, res) => {
  try {

    const admin_d_m = await Admin_mongo.fetch(req,res);
    
    // const admin_data = await Admin.get(["id", "password", "isValid"], {
    //   email,
    // });

    // if (!admin_data || !admin_data.id) {
    //   res.send({
    //     success: false,
    //     message: "There is no admin with this email",
    //   });
    //   return;
    // }

    // if (admin_data.password != utils.getHash(password)) {
    //   res.send({
    //     success: false,
    //     message: "Password is incorrect",
    //   });
    //   return;
    // }

    // const { token } = utils.getToken(
    //   { user_id: admin_data.id, is_admin: true },
    //   process.env.ACCESS_TOKEN_IDRSA,
    //   "access_token",
    // );
    //   new Cookies(req, res).set('accessToken', token, {
    //     httpOnly: true
    //   });
    // res.cookie('accessToken', , {
    //   httpOnly: true
    // });

    // let options = {
    //   maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    //   httpOnly: true, // The cookie only accessible by the web server
    //   signed: false, // Indicates if the cookie should be signed
    // };

    // Set cookie
    // res.cookie("accessToken", token, options);
    // res.send({
    //   success: true,
    //   // token,
    //   adminId: email,
    //   message: "LoggedIn successfully",
    // });
    // console.log(res);
  } catch (error) {
    console.log(error);
    utils.handleError(error, "verifyAndAuthorize", source_file);
    // res.send({
    //   success: false,
    //   error: error,
    // });
  }
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Admin.getAllAdmines(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admin .",
      });
    else res.send(data);
  });
};

// Find a single Product by Id
exports.findOne = (req, res) => {
  Admin.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving admin with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Productsx
exports.findAllPublished = (req, res) => {
  Admin.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    else res.send(data);
  });
};

// Update a Product identified by the id in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Admin.updateById(req.params.id, new Admin(req.body), (err, data) => {
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

// Update a Product identified by the id in the request
exports.changePassword = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  try {
    let id = req.params.id;
    const admin_data = await Admin.get(["id", "password", "isValid"], {
      id,
    });

    if (admin_data.password == utils.getHash(req.body.oldPassword)) {
      let adminUpdate = new Admin(req.body);
      adminUpdate.password = utils.getHash(req.body.password);
      Admin.updateById(req.params.id, adminUpdate, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Admin with id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Error updating Password for admin with id " + req.params.id,
            });
          }
        } else {
          delete data.password;
          res.send(data);
        }
      });
    } else {
      res.status(404).send({
        message: "Password Not Matching",
      });
    }
    console.log({ admin_data });
  } catch (error) {
    res.status(500).send({
      message: "Error updating Password for admin Password ",
    });
  }
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  Admin.remove(req.params.id, (err, data) => {
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
  Admin.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
