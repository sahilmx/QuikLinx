const sql = require("../DB/db_connection").con;
const { getConnection } = require("../utils/connectionManager");
const utils = require('../helper/utils');
const source_file = 'rewardifyModel';
const masterDb = require('../utils/commonDBConnection');
const commonDBConnection = require("../utils/commonDBConnection");





// constructor
const Rewardify = function (rewardify) {
  this.option_name=rewardify.option_name;
  this.sub_option_array= rewardify.sub_option_array;
  this.creation_date= rewardify.create_date;
  this.updation_date= rewardify.updation_date;
};


Rewardify.create = async (newRewardifyOption, result) => {
  try {
    const res = await masterDb.insert(newRewardifyOption).into("rewardify").returning('id');
    result(null, {...newRewardifyOption,id:res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};


Rewardify.findById = async (id, result) => {
  try {
    const res = await getConnection().select("*").from("batch").where("id", id);
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

Rewardify.get = async (details,email)=>{

  try {
    const res= await commonDBConnection.select(details).from('admins').where(email);
    
    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({error});
    return;
    }

};

Rewardify.getAll = async (title, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("rewardify");
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

Rewardify.updateById = async (id, details, result) => {


  try {
    const res= await masterDb.from("rewardify").update(details).where({id});

    result(null, {...details,data:res[0]});
  } catch (error) {
    utils.handleError(error, "Update By Id", source_file);
    console.log({error});
     result(null, error);;
  }
  return;
  sql.query(
    "UPDATE batch SET title = ?, description = ?, published = ? WHERE id = ?",
    [batch.title, batch.description, batch.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated tutorial: ", { id: id, ...batch });
      result(null, { id: id, ...batch });
    },
  );
};

Rewardify.remove = async (id, result) => {
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

Rewardify.removeAll = async (result) => {
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
Rewardify.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("batch");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};


Rewardify.checkPresent = async (rewardify) => {
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

module.exports = Rewardify;
