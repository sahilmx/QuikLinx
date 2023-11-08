
const { getConnection } = require("../utils/connectionManager"); // tenant specific connection manager


// constructor
const ProductSubCategory = function(productSubCategories) {
  this.productcategory = productSubCategories.productCategory;
  this.subcategoryname = productSubCategories.subCategoryName;
};

ProductSubCategory.create = async (prodCat, result) => {
 
  try {
    const res = await getConnection()
      .insert(prodCat)
      .into("productsubcategories")
      .returning("id");

    result(null, { id: res[0].id, ...prodCat });
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  return;


};

ProductSubCategory.findById = async (id, result) => {
 
  try {
    const res = await getConnection()
      .select("*")
      .from("productsubcategories")
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

ProductSubCategory.findCatById = async (id, result) => {


  try {
    const res = await getConnection()
      .select("*")
      .from("productsubcategories")
      .where("productcategory", id);
      if (res.length) {
    
        result(null, res);
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


ProductSubCategory.getAll = (result) => {
  
  try {
   
    const res = getConnection().raw(
      'select psc.id , psc.subCategoryName , psc.creationTime , pc.categoryName from productSubCategories psc left join productCategories pc on pc.id = psc.productCategory',
    ).then((rows)=>{
      if (rows.rowCount>0) {
        // console.log("found productCategory: ", response);
        result(null, rows.rows);
        return;
      }
      result({ kind: "not_found" }, null);
    }).catch((err)=>{

      console.log("error: ", err);
          result(err, null);
          return;
    });
    console.log(res);
  } catch (error) {
    console.log("error", error);
  }

};

ProductSubCategory.updateById = async (id, productSubCategories, result) => {
  // console.log(productSubCategories);

  try {
    const res = await getConnection()
      .from("productSubCategories")
      .update(productSubCategories)
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

ProductSubCategory.remove = async (id, result) => {

  try {
    const res = await getConnection()
      .from("productSubCategories")
      .del()
      .where({ id });
    console.log(res);
    if (res == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted productSubCategories with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }

 
};

ProductSubCategory.removeAll = async (result) => {
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

module.exports = ProductSubCategory;
