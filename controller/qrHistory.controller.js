const Qr = require("../model/qr.model");
const QrH = require("../model/qrHistory.model");
const { v4: uuidv4 } = require("uuid");
const Product = require("../model/product.model");
const { generateQr } = require("../model/qrHistory.model");
const source_file = "QRHistoryController";
const utils = require("../helper/utils");



//Create a parent Qr Code

const generateParentQrCode = (
  { product_id, qr_count, batch_id },
  { qrh_id },
) => {
  const qrCodeParent = new QrH({
    qr_type: 1,
    b_id: batch_id,
    qr_parent_id: null,
    qr_creation: new Date().toISOString().slice(0, 19).replace("T", " "),
    unique_id: uuidv4(),
    qrh_id: qrh_id,
  });

  console.log({qrCodeParent});
  QrH.generateQr(qrCodeParent, (err, data) => {
    if (err) return false;
    else {
      console.log("asdfghjkl", { data });
      let parent_id = data.id;
      for (let i = 0; i < qr_count; i++) {
        generateChildQrCode({ batch_id }, { qrh_id }, { parent_id });
      }
    }
  });
};

const generateChildQrCode = async ({ batch_id }, { qrh_id }, { parent_id }) => {
  const qrCodeChild = new QrH({
    qr_type: 0,
    b_id: batch_id,
    qr_parent_id: parseInt (parent_id),
    qr_creation: new Date().toISOString().slice(0, 19).replace("T", " "),
    unique_id: uuidv4(),
    qrh_id: qrh_id,
  });
  // for(let i=0;i<qr_count;i++){
  await QrH.generateQr(qrCodeChild, (err, data) => {
    if (err) return false;
    else {
      console.log("asdfgh", { data });
    }
  });
  // }
};

// Create a child QR Code


// get the product info 




// Create and Save a new Qr
const GenerateQrCode = async ({ product_id, qr_count, batch_id },{ qrh_id }) => {

  console.log(product_id, qr_count, batch_id,qrh_id);

let  prodData; 
await Product.findById(product_id, (err, data) => {
    if(err) {
      console.log("indide getprodInfo",err);
      //res.status(404).send(err)
    }
    console.log("prodData",data);
prodData=data;
    return data;
  });
  console.log({prodData});
      console.log("asdf", { prodData: prodData  });
      if (prodData)  {
       // complex qr code
       

        if(prodData.qr_type==1){
          for (let i = 0; i < prodData.qty; i++) {
            generateParentQrCode({ product_id, qr_count, batch_id }, { qrh_id });
          }
        }
        else {
          for (let i = 0; i < qr_count; i++) {
         
            const qrCode = new QrH({
              qr_type: 1,
              b_id: batch_id,
              qr_parent_id: null,
              qr_creation: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
              unique_id: uuidv4(),
              qrh_id: qrh_id,
            });
  
             QrH.generateQr(qrCode, (err, data) => {
              if (err) return false;
              else {
                console.log("asdfgh", { data });
              }
            });
          }
        }
      } 
  


  // const qrCode = new Qr({
  //   qr_type: 2,
  //   b_id: req.body.b_name,
  //   qr_parent_id: null,
  //   qr_creation: new Date(),
  //   unique_id:uuidv4() ,
  // });
};

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Qr
  const qr = new Qr({
    batch_id: req.body.batch_id,
    qr_count: req.body.qr_count,
    product_id: req.body.product_id,
    creation: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  // save QR codes for the product in qr_code table according to the product

  // Save Qr in the database

  try {
    const data = await Qr.create(qr);
    if(data.success){
      console.log({data});
      
       await GenerateQrCode(qr, { qrh_id: data.res });
       res.send(data);
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Qr.",
    });
  }
  // await Qr.create(qr, (err, data) => {
  //   if (err){

  //   }
      
  //   else {
      
  //   }
  // });
};

// Retrieve all Qrs from the database (with condition).
exports.findAll = (req, res) => {
  //const title = req.query.title;
  // Qr.getAll(title, (err, data) => {

  Qr.getAll("", (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Qrs.",
      });
    else res.send(data);
  });
};

// Find a single Qr by Id
exports.findOne = (req, res) => {
  Qr.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Qr with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Qr with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Qrs
exports.findAllPublished = (req, res) => {
  Qr.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Qrs.",
      });
    else res.send(data);
  });
};

// Update a Qr identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Qr.updateById(req.params.id, new Qr(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Qr with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Qr with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Qr with the specified id in the request
exports.delete = (req, res) => {
  Qr.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Qr with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Qr with id " + req.params.id,
        });
      }
    } else res.send({ message: `Qr was deleted successfully!` });
  });
};

// Delete all Qrs from the database.
exports.deleteAll = (req, res) => {
  Qr.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Qrs.",
      });
    else res.send({ message: `All Qrs were deleted successfully!` });
  });
};
