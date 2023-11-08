const VendorUser = require("../model/vendorUser.model");
const utils = require("../helper/utils");
const source_file = "vendorUserController";
const fs = require("fs");
const sharp = require("sharp");
const moment = require("moment");

// Create and Save a new Product
exports.create = async (req) => {
  // Validate request
  if (!req) {
    return;
  }
  let absolute_path = __dirname + "/../" + req.logo_full_path;

  try {
    if (fs.existsSync(absolute_path)) {
      let buffer = await sharp(absolute_path).toBuffer();
    }
  } catch (error) {
    return error;
  }
 //console.log(req);
  // Create a new Admin
 

  const vendor = new VendorUser({
    u_name: req.u_name,
    otherinfo: req.otherinfo,
    password: utils.getHash(req.password),
    u_name: req.u_name,
    u_email: req.u_email,
    user_role: req.user_role || 3,
    u_mobile: req.u_mobile,
    u_altr_mobile: req.u_altr_mobile,
    gender: req.gender,
    u_dob: moment(req.u_dob).format('YYYY-MM-DD hh:mm:ss') ,
    u_doj: new Date(),
    u_status: req.u_status,
    u_address: req.u_address,
    u_aadhar: req.u_aadhar,
    u_aadhar_img: req.u_aadhar_img,
    u_pan: req.u_pan,
    u_pan_img: req.u_pan_img,
    created_on: new Date(),
    updated_on: new Date(),
    tenant_slug: req.tenant_slug || "tenenatTest",
  });

  // const checkPresent = await VendorUser.checkPresent(vendor);
  // console.log({checkPresent: checkPresent})
  let returnData;

  // if (checkPresent.success) {
  //   return {
  //     success: false,
  //     data: "VendorUser  already present ",
  //   };
  // } else {

    await VendorUser.create(vendor,vendor.tenant_slug, (err, data) => {
      if (err) {
        utils.handleError(err, "check present ", source_file);
        return {
          message:
            err.message || "Some error occurred while creating the Admin .",
        };
      } else {
       // console.log("creationOfVendor", data);
        returnData = data;
        return { success: true, data: data }; // data: data,
      }
    });
  // }
  return returnData;
};

exports.findAll = (req, res) => {
  console.log("findall VendorUser");
  const title = req.query.title;

  VendorUser.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admin .",
      });
    else res.send(data);
  });
};

// Update a VendorUser identified by the id in the request
// exports.update = (req, res) => {

// };

exports.update = async (req) => {
  //utils.getHash(req.password),

  // Validate request
  if (!req) {
    return;
  }
  let absolute_path = __dirname + "/../" + req.logo_full_path;

  try {
    if (fs.existsSync(absolute_path)) {
      let buffer = await sharp(absolute_path).toBuffer();
    }
  } catch (error) {
    return error;
  }


  let vendor = new VendorUser(req);
  // vendor.productsavailing = req.productsawailing;
  // vendor.usertypes = req.usertypes;
  // vendor.company_users_requirement = req.company_users_requirement;
  let slug=req.slug;

  if (req.password) {
    vendor.password = utils.getHash(req.password);
  }
  vendor.updated_on = new Date();

  vendor.u_dob = moment(req.u_dob).format('YYYY-MM-DD hh:mm:ss') 
  console.log({ vendor });

  let returnData;
  await VendorUser.updateById(req.id, vendor,slug, (err, data) => {
    if (err) {
      utils.handleError(err, "check present ", source_file);
      if (err.kind === "not_found") {
        return {
          success: false,
          message: `Not found Product with id ${req.params.id}.`,
        };
      } else {
        return {
          success: false,
          message: "Error updating Product with id " + req.params.id,
        };
      }
    } else return { success: true, data: data };
  });

  // await VendorUser.create(vendor, (err, data) => {
  //   if (err) {
  //     utils.handleError(err, "check present ", source_file);
  //     return {
  //       message:
  //         err.message || "Some error occurred while creating the Admin .",
  //     };
  //   } else {
  //     console.log("creationOfVendor", data);
  //     returnData = data;
  //     return { success: true, data: data }; // data: data,

  //   }
  // });

  return returnData;
};

// Find a single Product by Id
exports.findOne = (req, res) => {
  console.log("this is the findone",req.headers['slug'])
  VendorUser.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found VendorUser with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving VendorUser with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};


exports.verifyAndAuthorize = async (req, res) => {

  console.log("This is verify and authorize ");
  try {
    const email = req.body.email;
    const password = req.body.password;
    const vendor_data = await VendorUser.get(["id", "password","tenant_slug","user_role"], {
      "u_email":email,
    });

    if (!vendor_data || !vendor_data.id) {
      res.send({
        success: false,
        message: "There is no user with this email",
      });
      return;
    }

    if (vendor_data.password != utils.getHash(password)) {
      res.send({
        success: false,
        message: "Password is incorrect",
      });
      return;
    }

    const { token } = utils.getToken(
      { user_id: vendor_data.id, is_admin: false },
      process.env.ACCESS_TOKEN_IDRSA,
      "access_token",
    );
    delete vendor_data.password;
    res.send({ success: true, token, message: "LoggedIn successfully" ,vendor_data: vendor_data });
  } catch (error) {
    console.log(error);
    utils.handleError(error, "verifyAndAuthorize", source_file);
    res.send({
      success: false,
      error: error,
    });
  }
};
