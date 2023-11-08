const utils = require("../helper/utils");
const source_file = "vendorUserModel";
const masterDb = require("../utils/commonDBConnection");
const { getConnection } = require("../utils/connectionManager");


// constructor
const VendorUser = function (vendorUser) {

  this.u_name= vendorUser.u_name;
  this.otherinfo= vendorUser.otherinfo;
  this.password= vendorUser.password;
  this.u_name= vendorUser.u_name;
  this.u_email= vendorUser.u_email;
  this.user_role= vendorUser.user_role;
  this.u_mobile= vendorUser.u_mobile;
  this.u_altr_mobile= vendorUser.u_altr_mobile;
  this.gender= vendorUser.gender;
  this.u_dob= vendorUser.u_dob;
  this.u_doj= vendorUser.u_doj;
  this.u_status= vendorUser.u_status;
  this.u_address= vendorUser.u_address;
  this.u_aadhar= vendorUser.u_aadhar;
  this.u_aadhar_img= vendorUser.u_aadhar_img;
  this.u_pan= vendorUser.u_pan;
  this.u_pan_img= vendorUser.u_pan_img;
  this.created_on= vendorUser.created_on;
  this.updated_on= vendorUser.updated_on;
  this.tenant_slug= vendorUser.tenant_slug ;

};


VendorUser.create = async (newVendor,slug, result) => {
  console.log(newVendor);

  try {
    const res = await getConnection(slug).insert(newVendor).into("vendor_users").returning("id");
    result(null, { ...newVendor, id: res[0].id });
  } catch (error) {
    utils.handleError(error, "vendorUser creation", source_file);
    console.log(error);
    result(null, error);
  }
  return;
};

VendorUser.findById = async (id, result) => {
  try {
    const res = await getConnection()
      .select("*")
      .from("vendor_users")
      .where({id});
      
    let data = res[0];
    delete data.password;
    console.log(res);
    if (res.length) {
      result(null, data);
      return;
    }

    result({ kind: "not_found" }, null);
  } catch (error) {
    utils.handleError(error, "findById", source_file);
    result(error, null);

    return;
  }
};

VendorUser.get = async (details, id) => {
  try {
    const res = await getConnection()
      .select(details)
      .from("vendor_users")
      .where(id);

    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({ error });
    return;
  }
};

VendorUser.getAll = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("vendor_users");
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

VendorUser.updateById = async (id, details,slug, result) => {

  console.log(details,slug);
  try {
    const res = await getConnection(slug)
      .from("vendor_users")
      .update(details)
      .where({ id });
    result(null, { ...details, data: res[0] });
  } catch (error) {
    utils.handleError(error, "Update By Id", source_file);
    console.log({ error });
    result(null, error);
  }
  return;
};

VendorUser.remove = async (id, result) => {
  try {
    const res = await getConnection().from("vendor_users").del().where({ id });
    console.log(res);
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted vendorUser with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

VendorUser.removeAll = async (result) => {
  try {
    const res = await getConnection().from("vendor_users").del();
    console.log(`deleted ${res.length} batch`);
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

/**
 * Get all the users.
 **/
VendorUser.getAllVendors = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("batch");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};

// const res2=await getConnection().raw("create database testy");
// console.log({res2});
VendorUser.createAVendorDb = async (vendorUser) => {
  await getConnection().raw(`create database tenant${vendorUser.tenant_id}_db`);

  const newVendorRegistration = {
    slug: vendorUser.tenant_slug,
    db_name: `tenant${vendorUser.tenant_id}_db`,
    db_host: "localhost",
    db_username: "QuikLinx",
    db_password: "",
    db_port: "5432",
    created_at: new Date(),
    updated_at: new Date(),
  };
  try {
    const res = await getConnection()
      .insert(newVendorRegistration)
      .into("tenants")
      .returning("id");
    return { status: true, data: { ...newVendorRegistration, id: res[0].id } };
    // result(null, {...newVendorRegistration,id:res[0].id });
  } catch (error) {
    utils.handleError(error, "tenant DB Addition", source_file);
    console.log(error);
    return {
      success: false,
      error: error,
    };
  }
};

VendorUser.countVendors = async () => {
  try {
    let res = await getConnection().count("*").from("tenants");
    const lastId = await getConnection()
      .select("id")
      .from("tenants")
      .orderBy("id", "desc");

    res.lastId = lastId[0]["id"];
    if (res.length > 0) {
      return {
        success: true,
        data: res,
      };
    } else {
      return {
        success: false,
        data: [],
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
VendorUser.checkPresent = async (vendorUser) => {
  try {
    const res = await getConnection()
      .select("*")
      .from("vendor_users")
      .where("c_email", vendorUser.c_email)
      .orWhere("c_mobile", vendorUser.c_mobile);
    if (res.length > 0) {
      return {
        success: true,
        data: res,
      };
    } else {
      return {
        success: false,
        data: [],
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

module.exports = VendorUser;
