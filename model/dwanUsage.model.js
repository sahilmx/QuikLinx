const sql = require("../DB/db_connection").con;
const { getConnection } = require("../utils/connectionManager");
const utils = require('../helper/utils');
const source_file = 'dwanUsageModel';
const masterDb = require('../utils/commonDBConnection');
const commonDBConnection = require("../utils/commonDBConnection");





// constructor
const DwanUsage = function (dwan) {
  this.vendor_id=dwan.vendor_id;
  this.options= dwan.options;
  this.created_at= dwan.created_at;
  this.updated_at= dwan.updated_at;
};


DwanUsage.create = async (newDwanOption, result) => {
  try {
    const res = await masterDb.insert(newDwanOption).into("dwan_usage").returning('id');
    result(null, {...newDwanOption,id:res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};


DwanUsage.findById = async (id, result) => {
  try {
    const res = await masterDb.select("*").from("dwan_usage").where("vendor_id", id);
    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  } catch (error) {
    utils.handleError(error, "findById", source_file);
    result(error, null);

    return;
  }
};

DwanUsage.get = async (details,email)=>{

  try {
    const res= await commonDBConnection.select(details).from('dwan_usage').where(email);
    
    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({error});
    return;
    }

};

DwanUsage.getAll = async (title, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("dwan_usage");
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

DwanUsage.updateById = async (id, details, result) => {

  console.log({details});

  try {
    const res= await masterDb.from("dwan_usage").update(details).where('vendor_id',id);

    result(null, {...details,data:res[0]});
  } catch (error) {
    utils.handleError(error, "Update By Id", source_file);
    console.log({error});
     result(null, error);;
  }
  return;
};

DwanUsage.remove = async (id, result) => {
  try {
    const res = await getConnection().from("dwan_usage").del().where({ id });
    console.log(res);
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted tutorial with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return; 
  }
};

DwanUsage.removeAll = async (result) => {
  try {
    const res = await getConnection().from("dwan_usage").del();
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
DwanUsage.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("dwan_usage");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};




module.exports = DwanUsage;
