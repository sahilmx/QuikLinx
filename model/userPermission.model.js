const sql = require("../DB/db_connection").con;
const pool = require("../DB/db_connection").pool;
const { getConnection } = require("../utils/connectionManager"); // tenant specific connection manager

// constructor
const userRole = function (users_role) {
 
  this.name = users_role.name;
  this.permissions = users_role.permissions;
  this.created_on = users_role.created_on;
};

userRole.create = async (userRole, result) => {
  try {
    const res = await getConnection()
      .insert(userRole)
      .into("users_role")
      .returning("id");

    result(null, { id: res[0].id, ...userRole });
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  return;
};

userRole.findById = async (id, result) => {
  try {
    const res = await getConnection()
      .select("*")
      .from("users_role")
      .where("id", id);
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);

    return;
  } catch (error) {
    result(error, null);
    console.log("iside product model", error);
    return;
  }
};

userRole.getAll = async (result) => {
  try {
    const res = await getConnection().select("*").from("users_role");
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
  }
  return;
};

userRole.updateById = async (id, users_role, result) => {
  // console.log(users_role);

  try {
    const res = await getConnection()
      .from("users_role")
      .update(users_role)
      .where({ id });

    if (res == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(res);

    result(null, { id: id, ...users_role });
    return;
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

userRole.remove = async (id, result) => {
  try {
    const res = await getConnection()
      .from("users_role")
      .del()
      .where({ id });
    console.log(res);
    if (res == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted users_role with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

userRole.removeAll = async (result) => {
  try {
    const res = await getConnection().from("users_role").del();
    console.log(`deleted ${res.length} batch`);
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

module.exports = userRole;
