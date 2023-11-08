const { getConnection } = require("../utils/connectionManager");
const utils = require('../helper/utils');
const source_file = 'dwankModel';
const masterDb = require('../utils/commonDBConnection');





// constructor
const Dwan = function (dwan) {
  this.option_name=dwan.option_name;
  this.sub_option_array= dwan.sub_option_array;
  this.creation_date= dwan.create_date;
  this.updation_date= dwan.updation_date;
};


Dwan.create = async (newGenuineMarkOption, result) => {
  console.log({newGenuineMarkOption});
  try {
    const res = await masterDb.insert(newGenuineMarkOption).into("dwan").returning('id');
    console.log(res[0].id);
    result(null, {...newGenuineMarkOption,id:res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};


Dwan.findById = async (id, result) => {
  try {
    const res = await getConnection().select("*").from("dwan").where("id", id);
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

Dwan.get = async (details,email)=>{

  try {
    const res= await masterDb.select(details).from('dwan').where(email);
    
    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({error});
    return;
    }

};

Dwan.getAll = async (title, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("dwan");
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

Dwan.updateById = async (id, details, result) => {


  try {
    const res= await masterDb.from("dwan").update(details).where({id});

    result(null, {...details,data:res[0]});
  } catch (error) {
    utils.handleError(error, "Update By Id", source_file);
    console.log({error});
     result(null, error);;
  }
  return;
};

Dwan.remove = async (id, result) => {
  try {
    const res = await getConnection().from("dwan").del().where({ id });
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

Dwan.removeAll = async (result) => {
  try {
    const res = await getConnection().from("dwan").del();
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
Dwan.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("dwan");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};


Dwan.checkPresent = async (dwan) => {
  try {

    const res = await masterDb.select("*").from("dwan").where("email", dwan.email).orWhere("phone",dwan.phone); 
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

module.exports = Dwan;
