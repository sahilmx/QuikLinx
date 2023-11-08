const sql = require("../DB/db_connection").con;
const { getConnection } = require("../utils/connectionManager");
const utils = require('../helper/utils');
const source_file = 'genuinemarkUsageModel';
const masterDb = require('../utils/commonDBConnection');
const commonDBConnection = require("../utils/commonDBConnection");





// constructor
const GenuineMarkUsage = function (genuineMark) {
  this.vendor_id=genuineMark.vendor_id;
  this.options= genuineMark.options;
  this.created_at= genuineMark.created_at;
  this.updated_at= genuineMark.updated_at;
};


GenuineMarkUsage.create = async (newRewardifyOption, result) => {
  try {
    const res = await masterDb.insert(newRewardifyOption).into("genuinemark_usage").returning('id');
    result(null, {...newRewardifyOption,id:res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};


GenuineMarkUsage.findById = async (id, result) => {
  try {
    const res = await masterDb.select("*").from("genuinemark_usage").where("vendor_id", id);
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

GenuineMarkUsage.get = async (details,email)=>{

  try {
    const res= await commonDBConnection.select(details).from('admins').where(email);
    
    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({error});
    return;
    }

};

GenuineMarkUsage.getAll = async (title, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("genuinemark_usage");
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

GenuineMarkUsage.updateById = async (id, details, result) => {

  console.log({details});

  try {
    const res= await masterDb.from("genuinemark_usage").update(details).where('vendor_id',id);

    result(null, {...details,data:res[0]});
  } catch (error) {
    utils.handleError(error, "Update By Id", source_file);
    console.log({error});
     result(null, error);;
  }
  return;
};

GenuineMarkUsage.remove = async (id, result) => {
  try {
    const res = await getConnection().from("batch").del().where({ id });
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

GenuineMarkUsage.removeAll = async (result) => {
  try {
    const res = await getConnection().from("batch").del();
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
GenuineMarkUsage.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("batch");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};




module.exports = GenuineMarkUsage;
