const sql = require("../DB/db_connection").con;
const { getConnection } = require("../utils/connectionManager");
const utils = require("../helper/utils");
const source_file = "vendorModel";
const masterDb = require("../utils/commonDBConnection");
const { Query } = require("pg");
const getTempConnection = require("../utils/tenantTempConnection");
const query = require("../utils/tenant_db_schema");



// constructor
const Vendor = function (vendor) {
  this.c_name = vendor.c_name;
  this.socials = vendor.socials;
  this.password = vendor.password;
  this.c_email = vendor.c_email;
  this.c_mobile = vendor.c_mobile;
  this.website = vendor.website;
  this.c_address = vendor.c_address;
  this.c_gstin = vendor.c_gstin;
  this.created_on = vendor.created_on;
  this.updated_on = vendor.updated_on;
  this.tenant_id = vendor.tenant_id;
  this.tenant_slug = vendor.tenant_slug;
  this.c_status = vendor.c_status;
  this.c_panel_status = vendor.c_panel_status;
  this.qr_type = vendor.qr_type;
  this.c_contact_person = vendor.c_contact_person;
  this.c_contact_person_number = vendor.c_contact_person_number;
  this.productsavailing = vendor.productsavailing;
  this.demovalue = vendor.demovalue;
  this.industry = vendor.industry;
  this.logo = vendor.logo;
  this.usertypes = vendor.usertypes;
  this.company_users_requirement = vendor.company_users_requirement;
  this.rewardify = vendor.rewardify;
  this.genuinemark = vendor.genuinemark;
  this.dwan = vendor.dwan;
  this.supplybeam = vendor.supplybeam;
  this.hybridoceam = vendor.hybridoceam;
  this.scanandwin = vendor.scanandwin;
  this.mail_options= vendor.mail_options;
  this.msg_options=vendor.msg_options;
};

Vendor.create = async (newVendor, result) => {
  try {
    const res = await masterDb
      .insert(newVendor)
      .into("company_profile")
      .returning("id");
    result(null, { ...newVendor, id: res[0].id });
  } catch (error) {
    utils.handleError(error, "vendor creation", source_file);
    console.log(error);
    result(null, error);
  }
  return;
};

Vendor.findById = async (id, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("company_profile")
      .where("id", id);
    let data = res[0];
    delete data.password;
    console.log(data);
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

Vendor.get = async (details, id) => {
  try {
    const res = await masterDb
      .select(details)
      .from("company_profile")
      .where(id);

    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({ error });
    return;
  }
};

Vendor.getAll = async (title, result) => {
  try {
    const res = await masterDb.select("*").from("company_profile");
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

Vendor.updateById = async (id, details, result) => {
  console.log(details);
  try {
    const res = await masterDb
      .from("company_profile")
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

Vendor.remove = async (id, result) => {
  try {
    const res = await masterDb.from("company_profile").del().where({ id });
    console.log(res);
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted vendor with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

Vendor.removeAll = async (result) => {
  try {
    const res = await masterDb.from("company_profile").del();
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
Vendor.getAllVendors = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("batch");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};

// const res2=await masterDb.raw("create database testy");
// console.log({res2});
Vendor.createAVendorDb = async (vendor) => {

  //const res = await getConnection().raw(query);
  try {
    await masterDb.raw(`create database tenant${vendor.tenant_id}_db`);
    const res = await getTempConnection(vendor.tenant_id).raw(query);
    console.log("db response  ", res);
  } catch (error) {
    console.log(error);
  }

  const newVendorRegistration = {
    slug: vendor.tenant_slug,
    db_name: `tenant${vendor.tenant_id}_db`,
    db_host: "localhost",
    db_username: "QuikLinx",
    db_password: "",
    db_port: "5433",
    created_at: new Date(),
    updated_at: new Date(),
  };
  try {
    const res = await masterDb
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

Vendor.countVendors = async () => {
  try {
    let res = await masterDb.count("*").from("tenants");
    console.log("Response",);
    const lastId = await masterDb
      .select("id")
      .from("tenants")
      .orderBy("id", "desc");
      console.log({lastId});
     
    if (res[0].count != 0) {
      res.lastId = lastId[0]["id"];
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
Vendor.checkPresent = async (vendor) => {
  try {
    const res = await masterDb
      .select("*")
      .from("company_profile")
      .where("c_email", vendor.c_email)
      .orWhere("c_mobile", vendor.c_mobile);
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

module.exports = Vendor;
