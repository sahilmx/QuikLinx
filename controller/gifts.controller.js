const Gift = require("../model/gifts.model");
const source_file = "giftsController";
const utils = require("../helper/utils");
const fs = require("fs");
const sharp = require("sharp");
const moment = require("moment");

// Create and Save a new Gift
exports.create = (req) => {
console.log(req);
  // Validate request
  if (!req) {
    return({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Gift
  const gift = new Gift({


    g_brand : req.g_brand,
    g_name : req.g_name,
    g_value : req.g_value,
    g_price : req.g_price,
    g_image : req.g_image,
    user_type : req.user_type,
    status : req.status || true,
    created_on : new Date(),
    updated_on : new Date()

  });

  console.log("rhis is gift",req.slug);
  slug=req.slug;
  // Save Gift in the database
  Gift.create(gift, slug,(err, data) => {
    if (err)
      return({
        status:500,
        message:
          err.message || "Some error occurred while creating the Gift."
      });
    else return(data);
  });
};

// Retrieve all Qrs from the database (with condition).
exports.findAll = (req, res) => {
  
  //const title = req.query.title;
  // Gift.getAll(title, (err, data) => {

  Gift.getAll("", (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qrs."
      });
    else res.send(data);
  });
};

// Find a single Gift by Id
exports.findOne = (req, res) => {
  Gift.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Gift with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Gift with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Qrs
exports.findAllPublished = (req, res) => {
  Gift.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qrs."
      });
    else res.send(data);
  });
};


exports.update = async (req) => {

  console.log({req});
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


  let gift = new Gift(req);
  // vendor.productsavailing = req.productsawailing;
  // vendor.usertypes = req.usertypes;
  // vendor.company_users_requirement = req.company_users_requirement;

  
  gift.updated_on = new Date();
  console.log({ gift });
  

  let returnData;
  await Gift.updateById(req.id,gift,req.slug, (err, data) => {
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


// Update a Gift identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Gift.updateById(
//     req.params.id,
//     new Gift(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Gift with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Gift with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// Delete a Gift with the specified id in the request
exports.delete = (req, res) => {
  Gift.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Gift with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Gift with id " + req.params.id
        });
      }
    } else res.send({ message: `Gift was deleted successfully!` });
  });
};

// Delete all Qrs from the database.
exports.deleteAll = (req, res) => {
  Gift.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Qrs."
      });
    else res.send({ message: `All Qrs were deleted successfully!` });
  });
};