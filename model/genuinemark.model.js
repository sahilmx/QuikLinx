const { getConnection } = require("../utils/connectionManager");
const utils = require('../helper/utils');
const source_file = 'genuineMarkModel';
const masterDb = require('../utils/commonDBConnection');





// constructor
const GenuineMark = function (genuinemark) {
  this.option_name=genuinemark.option_name;
  this.sub_option_array= genuinemark.sub_option_array;
  this.creation_date= genuinemark.create_date;
  this.updation_date= genuinemark.updation_date;
};


GenuineMark.create = async (newGenuineMarkOption, result) => {
  console.log({newGenuineMarkOption});
  try {
    const res = await masterDb.insert(newGenuineMarkOption).into("genuinemark").returning('id');
    console.log(res[0].id);
    result(null, {...newGenuineMarkOption,id:res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};


GenuineMark.findById = async (id, result) => {
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

GenuineMark.get = async (details,email)=>{

  try {
    const res= await masterDb.select(details).from('admins').where(email);
    
    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({error});
    return;
    }

};

GenuineMark.getAll = async (title, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("genuinemark");
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

GenuineMark.updateById = async (id, details, result) => {


  try {
    const res= await masterDb.from("genuinemark").update(details).where({id});

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

GenuineMark.remove = async (id, result) => {
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

GenuineMark.removeAll = async (result) => {
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
GenuineMark.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("batch");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};


GenuineMark.checkPresent = async (genuinemark) => {
  try {

    const res = await masterDb.select("*").from("admins").where("email", genuinemark.email).orWhere("phone",genuinemark.phone); 
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

module.exports = GenuineMark;
