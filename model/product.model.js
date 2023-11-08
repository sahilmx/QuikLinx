const { getConnection } = require("../utils/connectionManager"); // tenant specific connection manager

// constructor
const Product = function (product) {
  this.p_name = product.p_name;
  this.p_description = product.p_description;
  this.p_creation = product.p_creation;
  this.p_updateion = product.p_updateion;
  this.productcategories = product.productCategories;
  this.productsubcategory = product.productSubCategory;
  this.qty = product.qty;
  this.modelno = product.modelNo;
  this.qr_type = product.qr_type;
};

Product.create = async (newTutorial, result) => {
  try {
    const res = await getConnection()
      .insert(newTutorial)
      .into("products")
      .returning("id");

    result(null, { id: res, ...newTutorial });
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  return;
};

Product.findById = async (id, result) => {
  console.log(id);
  try {
    const res = await getConnection()
      .select("*")
      .from("products")
      .where("id", id);
    console.log("tests", res[0]);
    result(null, res[0]);
    return;
  } catch (error) {
    result(error, null);
    console.log("iside product model", error);
    return;
  }
};

Product.getAll = async (title, result) => {
  let query = "SELECT * FROM products";

  if (title) {
    console.log(title);
    query += ` WHERE p_name LIKE '%${title}%'`;
  }

  try {
    const res = await getConnection().select("*").from("products");
    console.log("asdf res", res);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
  }
  return;
};
Product.getAllFull = async (result) => {
  try {
    const res = getConnection()
      .raw(
        "select p.id , p.p_name , p.p_description, p.p_creation,p.qty ,p.productcategories , p.productsubcategory, p.modelno,p.qr_type , psc.subcategoryname , pc.categoryname from products as p left join productcategories as pc on p.productcategories = pc.id left join productsubcategories as psc on p.productsubcategory = psc.id",
      )
      .then((rows) => {
        if (rows.rowCount > 0) {
          // console.log("found productCategory: ", response);
          result(null, rows.rows);
          return;
        }
        result({ kind: "not_found" }, null);
      })
      .catch((err) => {
        console.log("error: ", err);
        result(err, null);
        return;
      });
    console.log(res);
  } catch (error) {
    console.log("error", error);
  }
};
Product.getOneFull = async (id,result) => {
  try {
    const res = getConnection()
      .raw(
        `select p.id , p.p_name , p.p_description, p.p_creation,p.qty ,p.productcategories , p.productsubcategory, p.modelno,p.qr_type , psc.subcategoryname , pc.categoryname from products as p left join productcategories as pc on p.productcategories = pc.id left join productsubcategories as psc on p.productsubcategory = psc.id where p.id=${id}`,
      )
      .then((rows) => {
        if (rows.rowCount > 0) {
          // console.log("found productCategory: ", response);
        
          return rows.rows[0];
        }else {
          return { kind: "not_found" }
        }
      })
      .catch((err) => {
        console.log("error: ", err);
     
        return err;
      });
    console.log(res);
  } catch (error) {
    console.log("error", error);
  }
};

Product.updateById = async (id, product, result) => {
  try {
    const res = await getConnection()
      .from("products")
      .update(product)
      .where({ id });

    if (res == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, { id: id, ...product });
    return;
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

Product.remove = async (id, result) => {
  try {
    const res = await getConnection().from("products").del().where({ id });
    console.log(res);
    if (res == 0) {
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

Product.removeAll = async (result) => {
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

module.exports = Product;
