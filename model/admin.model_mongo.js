const { getAdminConnection } = require("../utils/connectionManager");
const adminService = require("../service/admin");
const utils = require("../helper/utils");



const create = async (req, res) => {
  try {
    const dbConnection = getAdminConnection();
    console.log("create dbConnection", dbConnection.name);
    console.log(req);
    const admin = await adminService.createAdmin(dbConnection, req.body);
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
    const admins = await adminService.getAllAdmins(dbConnection);
    // res.status(200).json({ success: true, admins });
  } catch (err) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const fetch = async (req, res) => {
  try {
    const dbConnection = getAdminConnection();
    const admins = await adminService.getAdmin(dbConnection,req);
    
    if(admins.email == req.body.email &&  utils.getHash(req.body.password) ==admins.password){
      res.status(200).json({ success: true, admins });
    }else{
      res.status(200).json({ success: false, error:"Invalid Creds " });
    }
  } catch (err) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
module.exports = { create, fetchAll,fetch };
