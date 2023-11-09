const { getAdminConnection } = require("../utils/connectionManager");
const adminService = require("../service/admin");
const utils = require("../helper/utils");
const Cookies = require("cookies");



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

const fetchValues = async (req, res) => {
  try {
    console.log("fetchValues",req.params.id);
    const dbConnection = getAdminConnection();
    const admin_data = await adminService.getAdminById(dbConnection,req.params.id);
    console.log({admin_data});



    if (admin_data.password == utils.getHash(req.body.oldPassword)) {

      password = utils.getHash(req.body.password);

      const updateAdmin = await adminService.updateAdmin(dbConnection,req,{password});


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
    const admins = await adminService.getAdmin(dbConnection,req);
    console.log({admins});
    
    if(admins.email == req.body.email &&  utils.getHash(req.body.password) ==admins.password){

      const { token } = utils.getToken(
        { user_id: admins._id, is_admin: true },
        "process.env.ACCESS_TOKEN_IDRSA",
        "token",
      );

        new Cookies(req, res).set('accessToken', token, {
          httpOnly: true
        });
        res.cookie("access_token", token, { maxAge: 900000, httpOnly: true });
  
      let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: false, // Indicates if the cookie should be signed
      };
  
      // Set cookie
      res.cookie("accessToken", token, options);
      res.status(200).json({ success: true, adminId:admins._id,message:"Logged in Successful "});
    }else{
      res.status(200).json({ success: false, error:"Invalid Creds " });
    }
  } catch (err) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};


module.exports = { create, fetchAll,fetch ,fetchValues};
