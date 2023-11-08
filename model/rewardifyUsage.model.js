const sql = require("../DB/db_connection").con;
const { getConnection } = require("../utils/connectionManager");
const utils = require('../helper/utils');
const source_file = 'rewardifyUsageModel';
const masterDb = require('../utils/commonDBConnection');
const commonDBConnection = require("../utils/commonDBConnection");





// constructor
const RewardifyUsage = function (rewardify) {
  this.vendor_id=rewardify.vendor_id;
  this.options= rewardify.options;
  this.created_at= rewardify.created_at;
  this.updated_at= rewardify.updated_at;
};


RewardifyUsage.create = async (newRewardifyOption, result) => {
  try {
    const res = await masterDb.insert(newRewardifyOption).into("rewardify_usage").returning('id');
    result(null, {...newRewardifyOption,id:res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};


RewardifyUsage.findById = async (id, result) => {
  try {
    const res = await masterDb.select("*").from("rewardify_usage").where("vendor_id", id);
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

RewardifyUsage.get = async (details,email)=>{

  try {
    const res= await commonDBConnection.select(details).from('admins').where(email);
    
    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({error});
    return;
    }

};

RewardifyUsage.getAll = async (title, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("rewardify_usage");
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

RewardifyUsage.updateById = async (id, details, result) => {

  console.log({details});

  try {
    const res= await masterDb.from("rewardify_usage").update(details).where('vendor_id',id);

    result(null, {...details,data:res[0]});
  } catch (error) {
    utils.handleError(error, "Update By Id", source_file);
    console.log({error});
     result(null, error);;
  }
  return;
};

RewardifyUsage.remove = async (id, result) => {
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

RewardifyUsage.removeAll = async (result) => {
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
RewardifyUsage.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("batch");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};


RewardifyUsage.checkPresent = async (rewardify) => {
  try {

    const res = await commonDBConnection.select("*").from("admins").where("email", rewardify.email).orWhere("phone",rewardify.phone); 
    if(res.length>0){
      return {
        success:true,
        data:res
      };
    }else{
      return{
        success:false,
        data:[]
      }

    }
    
  } catch (error) {
    return{
      success:false,
      error:error
    }
  }
};

module.exports = RewardifyUsage;
