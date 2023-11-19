const Vendor = require("../model/vendor.model");
const utils = require("../helper/utils");
const source_file = "vendorController";
const fs = require("fs");
const sharp = require("sharp");

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
  console.log(req.body);
  // Create a new Admin
  // const vendor = new Vendor({
  //   c_name: req.c_name,
  //   socials: req.socials,
  //   password: utils.getHash(req.password),
  //   c_name: req.c_name,
  //   c_email: req.c_email,
  //   p_id: req.p_id || null,
  //   c_mobile: req.c_mobile,
  //   website: req.website,
  //   c_address: req.c_address,
  //   c_gstin: req.c_gstin,
  //   created_on: new Date(),
  //   updated_on: new Date(),
  //   tenant_id: req.tenant_id || "0",
  //   tenant_slug: req.tenant_slug || "tenenatTest",
  //   c_status: parseInt(req.c_status),
  //   c_panel_status: parseInt(req.c_panel_status),
  //   qr_type: parseInt(req.qr_type),
  //   c_contact_person: req.c_contact_person,
  //   c_contact_person_number: req.c_contact_person_number,
  //   productsavailing: req.productsAwailing,
  //   demovalue: req.demoValue || 0,
  //   logo: req.logo,
  //   industry: req.industry,
  //   usertypes: req.userTypes,
  //   company_users_requirement: req.company_users_requirement || 0,
  //   rewardify: req.rewardify || 0,
  //   genuinemark: req.genuinemark || 0,
  //   dwang: req.dwang || 0,
  //   supplybeam: req.supplybeam || 0,
  //   hybridoceam: req.hybridoceam || 0,
  //   scanandwin: req.scanandwin || 0,
  //   mail_options: req.mail_options,
  //   msg_options: req.msg_options,
  // });


  
  console.log("reqbody", req);
  const countRes = await Vendor.countVendors();

  console.log("countRes", countRes);

  const checkPresent = await Vendor.checkPresent(vendor);
  let returnData;

  if (checkPresent.success) {
    return {
      success: false,
      data: "Vendor  already present ",
    };
  } else {
    vendor.tenant_id =  countRes.data.lastId ?countRes.data.lastId : 1  ;
    vendor.tenant_slug = "tenant" + vendor.tenant_id;
    const vendorDBCreation = await Vendor.createAVendorDb(vendor);

    if (!vendorDBCreation.status) {
      return {
        message:
          vendorDBCreation.error ||
          "Some error occurred while creating the DB  .",
      };
    }
    await Vendor.create(vendor, (err, data) => {
      if (err) {
        utils.handleError(err, "check present ", source_file);
        return {
          message:
            err.message || "Some error occurred while creating the Admin .",
        };
      } else {
        console.log("creationOfVendor", data);
        returnData = data;
        return { success: true, data: data }; // data: data,
      }
    });
  }
  return returnData;
};

exports.findAll = (req, res) => {
  console.log("findall Vendor");
  const title = req.query.title;

  Vendor.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admin .",
      });
    else res.send(data);
  });
};

// Update a Vendor identified by the id in the request
// exports.update = (req, res) => {

// };

exports.update = async (req) => {
  //utils.getHash(req.password),
  console.log(req.productsavailing);
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

  let vendor = new Vendor(req);
  if (req.productsavailing)
    vendor.productsavailing = JSON.parse(req.productsavailing);
  //console.log(JSON.parse(req.usertypes));
  if (vendor.usertypes) vendor.usertypes = JSON.parse(req.usertypes);
  vendor.company_users_requirement = req.company_users_requirement;
  if (req.password) {
    vendor.password = utils.getHash(req.password);
  }
  vendor.updated_on = new Date();
  console.log({ vendor });

  let returnData;
  await Vendor.updateById(req.id, vendor, (err, data) => {
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

  // await Vendor.create(vendor, (err, data) => {
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
  Vendor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vendor with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Vendor with id " + req.params.id,
        });
      }
    } else {
      const c_add = data.c_address;
      delete data.c_address;
      data.c_address = JSON.parse(c_add);
      res.send(data);
    }
  });
};

exports.verifyAndAuthorize = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const vendor_data = await Vendor.get(
      ["id", "password", "tenant_slug", "tenant_id", "rewardify"],
      {
        c_email: email,
      },
    );

    if (!vendor_data || !vendor_data.id) {
      res.send({
        success: false,
        message: "There is no admin with this email",
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
    res.send({
      success: true,
      token,
      message: "LoggedIn successfully",
      vendor_data: vendor_data,
    });
  } catch (error) {
    console.log(error);
    utils.handleError(error, "verifyAndAuthorize", source_file);
    res.send({
      success: false,
      error: error,
    });
  }
};
