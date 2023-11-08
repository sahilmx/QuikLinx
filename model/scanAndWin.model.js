const { getConnection } = require("../utils/connectionManager");
const utils = require('../helper/utils');
const source_file = 'ScanandWinModel';
const masterDb = require('../utils/commonDBConnection');





// constructor
const ScanAndWin = function (scanandwin) {
  this.option_name=scanandwin.option_name;
  this.sub_option_array= scanandwin.sub_option_array;
  this.creation_date= scanandwin.create_date;
  this.updation_date= scanandwin.updation_date;
};


ScanAndWin.create = async (newGenuineMarkOption, result) => {
  console.log({newGenuineMarkOption});
  try {
    const res = await masterDb.insert(newGenuineMarkOption).into("scanandwin").returning('id');
    console.log(res[0].id);
    result(null, {...newGenuineMarkOption,id:res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};


ScanAndWin.findById = async (id, result) => {
  try {
    const res = await getConnection().select("*").from("scanandwin").where("id", id);
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

ScanAndWin.get = async (details,email)=>{

  try {
    const res= await masterDb.select(details).from('scanandwin').where(email);
    
    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({error});
    return;
    }

};

ScanAndWin.getAll = async (title, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("scanandwin");
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

ScanAndWin.updateById = async (id, details, result) => {


  try {
    const res= await masterDb.from("scanandwin").update(details).where({id});

    result(null, {...details,data:res[0]});
  } catch (error) {
    utils.handleError(error, "Update By Id", source_file);
    console.log({error});
     result(null, error);;
  }
  return;
};

ScanAndWin.remove = async (id, result) => {
  try {
    const res = await getConnection().from("scanandwin").del().where({ id });
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

ScanAndWin.removeAll = async (result) => {
  try {
    const res = await getConnection().from("scanandwin").del();
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
ScanAndWin.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("scanandwin");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};


ScanAndWin.checkPresent = async (scanandwin) => {
  try {

    const res = await masterDb.select("*").from("scanandwin").where("email", scanandwin.email).orWhere("phone",scanandwin.phone); 
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

module.exports = ScanAndWin;
