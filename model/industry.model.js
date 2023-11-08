const sql = require("../DB/db_connection").con;
const { getConnection } = require("../utils/connectionManager"); // tenant specific connection manager
const utils = require('../helper/utils');
const source_file = 'rewardifyModel';
const masterDb = require('../utils/commonDBConnection');  // common db ->  master connection
const commonDBConnection = require("../utils/commonDBConnection");



// constructor
const Industry = function (industry) {
  this.i_name=industry.i_name;
  this.i_users= industry.i_users;
  this.created_at= industry.created_at;
  this.updated_at= industry.created_at;
};


Industry.create = async (newIndustry, result) => {
  try {
    const res = await masterDb.insert(newIndustry).into("industry").returning('id');
    result(null, {...newIndustry,id:res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};


Industry.findById = async (id, result) => {
  try {
    const res = await masterDb.select("*").from("industry").where("id", id);
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

Industry.get = async (details,email)=>{

  try {
    const res= await commonDBConnection.select(details).from('industry').where(email);
    
    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({error});
    return;
    }

};

Industry.getAll = async (title, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("industry");
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

Industry.updateById = async (id, details, result) => {


  try {
    const res= await masterDb.from("industry").update(details).where({id});

    result(null, {...details,data:res[0]});
  } catch (error) {
    utils.handleError(error, "Update By Id", source_file);
    console.log({error});
     result(null, error);;
  }
  return;
 
};

Industry.remove = async (id, result) => {
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

Industry.removeAll = async (result) => {
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
Industry.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("batch");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};


Industry.checkPresent = async (industry) => {
  try {

    const res = await commonDBConnection.select("*").from("admins").where("email", industry.email).orWhere("phone",industry.phone); 
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

module.exports = Industry;
