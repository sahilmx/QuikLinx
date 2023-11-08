const sql = require("../DB/db_connection").con;
const pool = require("../DB/db_connection").pool;
const { getConnection } = require("../utils/connectionManager"); // tenant specific connection manager

// constructor
const ProductCategory = function (productCategory) {
  this.categoryname = productCategory.categoryName;
  this.creationtime = productCategory.creationTime;
};

ProductCategory.create = async (prodCat, result) => {
  try {
    const res = await getConnection()
      .insert(prodCat)
      .into("productcategories")
      .returning("id");

    result(null, { id: res[0].id, ...prodCat });
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  return;
};

ProductCategory.findById = async (id, result) => {
  try {
    const res = await getConnection()
      .select("*")
      .from("productCategory")
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

ProductCategory.getAll = async (result) => {
  try {
    const res = await getConnection().select("*").from("productcategories");
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
  }
  return;
};

ProductCategory.updateById = async (id, productCategory, result) => {
  // console.log(productCategory);

  try {
    const res = await getConnection()
      .from("productcategories")
      .update(productCategory)
      .where({ id });

    if (res == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(res);

    result(null, { id: id, ...productCategory });
    return;
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

ProductCategory.remove = async (id, result) => {
  try {
    const res = await getConnection()
      .from("productCategories")
      .del()
      .where({ id });
    console.log(res);
    if (res == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted productCategories with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

ProductCategory.removeAll = async (result) => {
  try {
    const res = await getConnection().from("products").del();
    console.log(`deleted ${res.length} batch`);
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

module.exports = ProductCategory;
