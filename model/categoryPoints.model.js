const { getConnection } = require("../utils/connectionManager"); // tenant specific connection manager

// constructor
const CategoryPoints = function (CategoryPoints) {

  this.cat_id=ProductPoints.cat_id;
  this.sub_cat_id=ProductPoints.sub_cat_id;
  this.points=ProductPoints.points;
  this.status=ProductPoints.status;
  this.start_date=ProductPoints.start_date;
  this.end_date=ProductPoints.end_date;
  this.user_type=ProductPoints.user_type;
  this.created_by=ProductPoints.created_by;
  this.created_at=ProductPoints.created_at;
};


CategoryPoints.create = async (prodCat, result) => {
  try {
    const res = await getConnection()
      .insert(prodCat)
      .into("categorypoints")
      .returning("id");

    result(null, { id: res[0].id, ...prodCat });
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  return;
};

CategoryPoints.findById = async (id, result) => {
  try {
    const res = await getConnection()
      .select("*")
      .from("CategoryPoints")
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

CategoryPoints.getAll = async (result) => {
  try {
    const res = await getConnection().select("*").from("categorypoints");
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
  }
  return;
};

CategoryPoints.updateById = async (id, CategoryPoints, result) => {
  // console.log(CategoryPoints);

  try {
    const res = await getConnection()
      .from("categorypoints")
      .update(CategoryPoints)
      .where({ id });

    if (res == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(res);

    result(null, { id: id, ...CategoryPoints });
    return;
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

CategoryPoints.remove = async (id, result) => {
  try {
    const res = await getConnection()
      .from("categorypoints")
      .del()
      .where({ id });
    console.log(res);
    if (res == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted categorypoints with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

CategoryPoints.removeAll = async (result) => {
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

module.exports = CategoryPoints;
