// const { BASE_DB_URI } = require("../../config/env.json");

const { ObjectID } = require("mongoose/lib/schema/index");

const BASE_DB_URI= "mongodb://localhost:27017";


const getAlladmins = async adminDbConnection => {
  try {
    const Admin = await adminDbConnection.model("Admin");
    const admins = await Admin.find({});
    console.log("getAlladmins admins", admins);
    return admins;
  } catch (error) {
    console.log("getAlladmins error", error);
    throw error;
  }
};
const getAdmin = async (adminDbConnection,req) => {
  try {
    let email=req.body.email;
    const Admin = await adminDbConnection.model("Admin");
    const admins = await Admin.findOne({email});

    console.log({admins});
    return admins;
  } catch (error) {
    console.log("getAlladmins error", error);
    throw error;
  }
};
const getAdminById = async (adminDbConnection,id) => {
  try {

    console.log("this is adminby id ", id);
    const Admin = await adminDbConnection.model("Admin");
    const admins = await Admin.findOne({"_id":id});

    console.log({admins});
    return admins;
  } catch (error) {
    console.log("getAlladmins error", error);
    throw error;
  }
};

const createAdmin = async (adminDbConnection, body) => {

  try {

    console.log("body in create admin ",body);
    const Admin = await adminDbConnection.model("Admin");
    const email = body.email;
    const AdminPresent = await Admin.findOne({
      email
    });
    if (AdminPresent) {
      throw new Error("Admin Already Present");
    }
    const newAdmin = await new Admin({
     ...body
    }).save();
    return newAdmin;
  } catch (error) {
    console.log("createAdmin error", error);
    throw error;
  }
};

const updateAdmin = async (adminDbConnection,req, values) => {

  try {

    const Admin = await adminDbConnection.model("Admin");
 
  
    // const updateAdmin = await Admin.updateOne({"_id":ObjectID(id)},
    
    // )
    const updateAdmin = await Admin.updateOne({_id:req.params.id} , values, (err , collection) => {
      if(err) throw err;
      console.log("Record updated successfully");
      console.log(collection);
    });

     return updateAdmin;
  } catch (error) {
    console.log("updateAdmin error", error);
    throw error;
  }
};

module.exports = { getAlladmins,createAdmin,getAdmin,updateAdmin,getAdminById };
