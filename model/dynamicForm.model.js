const sql = require("../DB/db_connection").con;
const { getConnection } = require("../utils/connectionManager");
const utils = require('../helper/utils');
const source_file = 'dynamicFormModel';
const masterDb = require('../utils/commonDBConnection');
const commonDBConnection = require("../utils/commonDBConnection");


// id            
// template_name 
// industry      
// form_type     
// template_json 
// creation_date 
// updation_date 


// constructor
const DynamicForm = function (dynamicForm) {
  this.template_name=dynamicForm.template_name;
  this.industry= dynamicForm.industry;
  this.form_type=dynamicForm.form_type
  this.template_json=dynamicForm.template_json;
  this.creation_date= dynamicForm.creation_date;
  this.updation_date= dynamicForm.updation_date;
};


DynamicForm.create = async (newDynamicForm, result) => {
  try {
    const res = await masterDb.insert(newDynamicForm).into("form_template").returning('id');
    result(null, {...newDynamicForm,id:res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};


DynamicForm.findById = async (id, result) => {
  try {
    const res = await masterDb.select("*").from("form_template").where("id", id);
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

DynamicForm.get = async (details,id)=>{

  try {
    const res= await commonDBConnection.select(details).from('form_template').where(id);
    
    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({error});
    return;
    }

};

DynamicForm.getAll = async (title, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("form_template");
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

DynamicForm.updateById = async (id, details, result) => {

  console.log({details});

  try {
    const res= await masterDb.from("form_template").update(details).where('id',id);

    result(null, {...details,data:res[0]});
  } catch (error) {
    utils.handleError(error, "Update By Id", source_file);
    console.log({error});
     result(null, error);;
  }
  return;
};

DynamicForm.remove = async (id, result) => {
  try {
    const res = await getConnection().from("form_template").del().where({ id });
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

DynamicForm.removeAll = async (result) => {
  try {
    const res = await getConnection().from("form_template").del();
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
DynamicForm.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("form_template");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};




module.exports = DynamicForm;
