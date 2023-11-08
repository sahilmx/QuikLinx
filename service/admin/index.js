// const { BASE_DB_URI } = require("../../config/env.json");

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

module.exports = { getAlladmins, createAdmin,getAdmin };
