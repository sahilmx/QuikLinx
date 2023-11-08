const sql = require("../DB/db_connection").con;
const { getConnection } = require("../utils/connectionManager");
const utils = require('../helper/utils');
const source_file = 'adminModel';
const masterDb = require('../utils/commonDBConnection');
const commonDBConnection = require("../utils/commonDBConnection");





// constructor
const Admin = function (admin) {
  this.email = admin.email;
  this.password=admin.password;
  this.phone=admin.phone;
  this.name=admin.name;
  this.create_date=admin.create_date;
  this.isValid=admin.isValid || true;
};



Admin.create = async (newAdmin, result) => {
  try {
    const res = await commonDBConnection.insert(newAdmin).into("admins").returning('id');
    result(null, {...newAdmin,id:res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};

Admin.findById = async (id, result) => {
  try {
    const res = await getConnection().select("*").from("admins").where("id", id);
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

Admin.get = async (details,email)=>{

  console.log("These are the details ",details);

  try {
    const res= await masterDb.select(details).from('admins').where(email);
    console.log(res);
    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({error});
    return;
    }

};

Admin.getAll = async (title, result) => {
  try {
    const res = await getConnection()
      .select("*")
      .from("batch")
      .whereLike("b_name", `${title}`);
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

Admin.updateById = async (id, newAdmin, result) => {


  try {
    const res = await masterDb
      .from("admins")
      .update(newAdmin)
      .where({ id });

    if (res == 0) {
      // not found admin with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(res);

    result(null, { id: id, ...newAdmin });
    return;
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }

  // sql.query(
  //   "UPDATE batch SET title = ?, description = ?, published = ? WHERE id = ?",
  //   [batch.title, batch.description, batch.published, id],
  //   (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }

  //     if (res.affectedRows == 0) {
  //       // not found Tutorial with the id
  //       result({ kind: "not_found" }, null);
  //       return;
  //     }

  //     // console.log("updated tutorial: ", { id: id, ...batch });
  //     result(null, { id: id, ...batch });
  //   },
  // );
};

Admin.remove = async (id, result) => {
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

Admin.removeAll = async (result) => {
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
Admin.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("batch");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};


Admin.checkPresent = async (admin) => {
  try {

    const res = await commonDBConnection.select("*").from("admins").where("email", admin.email).orWhere("phone",admin.phone); 
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

module.exports = Admin;
