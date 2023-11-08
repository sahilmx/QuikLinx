const sql = require("../DB/db_connection").con;
const { getConnection } = require("../utils/connectionManager");
const utils = require('../helper/utils');
const source_file = 'batchController';




// constructor
const Batch = function (batch) {
  this.b_name = batch.b_name;
  this.b_creation = batch.b_creation;
};

Batch.create = async (newTutorial, result) => {
  try {
    const res = await getConnection().insert(newTutorial).into("batch");
    result(null, { id: res, ...newTutorial });
  } catch (error) {
    result(null, error);
  }
  return;
};

Batch.findById = async (id, result) => {
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

Batch.getAll = async (title, result) => {
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

Batch.updateById = async (id, batch, result) => {
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

Batch.remove = async (id, result) => {
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

Batch.removeAll = async (result) => {
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
Batch.getAllBatches = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("batch");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};

module.exports = Batch;
