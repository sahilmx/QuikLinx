const { getConnection } = require("../utils/connectionManager"); // tenant specific connection manager
const utils = require("../helper/utils");
const source_file = "TransactionStatusModel";
const masterDb = require("../utils/commonDBConnection"); // common db ->  master connection
const commonDBConnection = require("../utils/commonDBConnection");

// constructor
const TransactionStatus = function (transaction_status) {
  this.status_name = transaction_status.status_name;
  this.created_at = transaction_status.created_at;
};

TransactionStatus.create = async (newIndustry, result) => {
  try {
    const res = await masterDb
      .insert(newIndustry)
      .into("transaction_status")
      .returning("id");
    result(null, { ...newIndustry, id: res[0].id });
  } catch (error) {
    console.log(error);
    result(null, error);
  }
  return;
};

TransactionStatus.findById = async (id, result) => {
  try {
    const res = await masterDb
      .select("*")
      .from("transaction_status")
      .where("id", id);
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

TransactionStatus.get = async (details, email) => {
  try {
    const res = await commonDBConnection
      .select(details)
      .from("transaction_status")
      .where(email);

    return res[0];
  } catch (error) {
    utils.handleError(error, "get", source_file);
    console.log({ error });
    return;
  }
};

TransactionStatus.getAll = async (title, result) => {
  try {
    const res = await masterDb.select("*").from("transaction_status");
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

TransactionStatus.updateById = async (id, details, result) => {
  try {
    const res = await masterDb
      .from("transaction_status")
      .update(details)
      .where({ id });

    result(null, { ...details, data: res[0] });
  } catch (error) {
    utils.handleError(error, "Update By Id", source_file);
    console.log({ error });
    result(null, error);
  }
  return;
};

TransactionStatus.remove = async (id, result) => {
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

TransactionStatus.removeAll = async (result) => {
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
TransactionStatus.getAllAdmines = async (title, result) => {
  try {
    const res = await getConnection().select("*").from("batch");
    result(null, res);
  } catch (error) {
    result(null, error);
  }
  return;
};

TransactionStatus.checkPresent = async (transaction_status) => {
  try {
    const res = await commonDBConnection
      .select("*")
      .from("admins")
      .where("email", transaction_status.email)
      .orWhere("phone", transaction_status.phone);
    if (res.length > 0) {
      return {
        success: true,
        data: res,
      };
    } else {
      return {
        success: false,
        data: [],
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

module.exports = TransactionStatus;
