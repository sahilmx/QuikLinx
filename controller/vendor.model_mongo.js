const { getAdminConnection } = require("../utils/connectionManager");
const partnerServices = require("../service/partner");
const utils = require("../helper/utils");
const Cookies = require("cookies");



const create = async (req, res) => {
  try {
    const dbConnection = getAdminConnection();
    console.log("create dbConnection", dbConnection.name);
    console.log(req);
    const adminPresent = await partnerServices.getPartner(dbConnection,req);
    // if(adminPresent!=null){
    //   res.status(200).json( {
    //     success: false,
    //     data: "Vendor  already present ",
    //   });
    //   return;
    // }
    const admin = await partnerServices.createPartner(dbConnection, req);
    res.status(200).json({ success: true, admin });
  } catch (err) {
    console.log("signUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const dbConnection = getAdminConnection();
    console.log("create dbConnection", dbConnection.name);
    console.log(req);
    const adminPresent = await partnerServices.getPartner(dbConnection,req);
    if(adminPresent==null){
      res.status(200).json( {
        success: false,
        data: "Vendor  not  present ",
      });
      return;
    }
    const admin = await partnerServices.updatePartner(dbConnection, req,req);
    console.log({admin});
    res.status(200).json({ success: true, admin });
  } catch (err) {
    console.log("signUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchAll = async (req, res) => {
  try {
    const dbConnection = getAdminConnection();
    console.log("fetchAll dbConnection", dbConnection.name);
    console.log("this is the req ",req)
    const data = await partnerServices.getAllPartners(dbConnection);
     res.status(200).json({ success: true, data });
  } catch (err) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};



const fetchValues = async (req, res) => {
  try {
    console.log("fetchValues",req.params.id);
    const dbConnection = getAdminConnection();
    const admin_data = await partnerServices.getPartnerById(dbConnection,req.params.id);
    console.log({admin_data});



    if (admin_data.password == utils.getHash(req.body.oldPassword)) {

      password = utils.getHash(req.body.password);

      const updateAdmin = await partnerServices.updateAdmin(dbConnection,req,{password});


        if (updateAdmin.nModified>0) {
          res.status(200).json({ success: true, message:"Password Changed is Successful "});

          } else {
            res.status(200).send({
              message:
                "Error updating Password for admin with id " + req.params.id,
            });
          }
      
    } else {
      res.status(404).send({
        message: "Password Not Matching",
      });
    }

   

  } catch (err) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};


const fetch = async (req, res) => {
  try {
    const dbConnection = getAdminConnection();
    const data = await partnerServices.findById(dbConnection,req);
    console.log({data});
  
      res.status(200).json({ success: true, data });
  } catch (err) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};


module.exports = { create, fetchAll,fetch ,fetchValues,update};
