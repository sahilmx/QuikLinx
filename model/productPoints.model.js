const { getConnection } = require("../utils/connectionManager"); // tenant specific connection manager

// constructor


const ProductPoints = function (productPoints) {

  this.cat_id=productPoints.cat_id;
  this.sub_cat_id=productPoints.sub_cat_id;
  this.p_id=productPoints.p_id;
  this.points=productPoints.points;
  this.status=productPoints.status;
  this.start_date=productPoints.start_date;
  this.end_date=productPoints.end_date;
  this.user_type=productPoints.user_type;
  this.created_by=productPoints.created_by;
  this.created_at=productPoints.created_at;
};

ProductPoints.create = async (prodCat, result) => {
  try {
    const res = await getConnection()
      .insert(prodCat)
      .into("productpoints")
      .returning("id");

    result(null, { id: res[0].id, ...prodCat });
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  return;
};

ProductPoints.findById = async (id, result) => {
  try {
    const res = await getConnection()
      .select("*")
      .from("productpoints")
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

ProductPoints.findByQrCode = async (id, result) => {
  try {

    
    let prod_id =await getConnection().raw(`select qrh.product_id from qr_code as q left join qrcodehistory as qrh on q.qrh_id = qrh.id where q.unique_id ='${id}'`);
    prod_id=prod_id["rows"][0].product_id;
    const query = `select * from productpoints where p_id = ${prod_id}`;
    const prodData= await getConnection().raw(`select p.id , p.p_name , p.p_description, p.p_creation,p.qty ,p.productcategories , p.productsubcategory, p.modelno,p.qr_type , psc.subcategoryname , pc.categoryname from products as p left join productcategories as pc on p.productcategories = pc.id left join productsubcategories as psc on p.productsubcategory = psc.id where p.id=${prod_id}`);
    

    const qrData= await getConnection().raw(`select q.id , q.qr_type , q.qr_parent_id, q.qrh_id ,q.redeemed , qrh.id as qrHistoryId, qrh.batch_id , qrh.qr_count from qr_code as q left join qrcodehistory as qrh on q.qrh_id = qrh.id where q.unique_id = '${id}' `);
    const qrDetails= qrData['rows'][0];
    
    await getConnection().raw(query).then((rows) => {

      if (rows.rowCount > 0) {
        // console.log("found productCategory: ", response);
        let response= rows.rows[0];
        let prodDetails=prodData['rows'][0];
        response={...response,prodDetails,qrDetails};
        result(null, response);
        return;
      }
      result({ kind: "not_found" }, null);
    }).catch((error) => {
      console.log("error: ", error);
      result(error, null);
      return;
    });

      // .select("*")
      // .from("productpoints")
      // .where("id", id);
    // if (res.length) {
    //   result(null, res[0]);
    //   return;
    // }
    // result({ kind: "not_found" }, null);

    return;
  } catch (error) {
    result(error, null);
    console.log("iside product model", error);
    return;
  }
};


ProductPoints.getAll = async (result) => {
  try {
    const res = await getConnection().select("*").from("productpoints");
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
  }
  return;
};
ProductPoints.getAllWithAllInfo = async (result) => {


  // "id": 9,
  //       "cat_id": 15,
  //       "sub_cat_id": 4,
  //       "p_id": 2,
  //       "points": 26,
  //       "status": true,
  //       "start_date": "2022-12-22T06:40:29.068Z",
  //       "end_date": "2023-12-22T06:40:29.068Z",
  //       "user_type": 1,
  //       "created_by": 39,
  //       "created_at": "2022-12-22T06:40:29.000Z"

  getConnection()
  .raw(
    "select pp.id , pp.cat_id , pp.sub_cat_id, pp.p_id, pp.points ,pp.status , pp.created_at, psc.subcategoryname , pc.categoryname , p.p_name , p.p_description from productpoints as pp left join productcategories as pc on pp.cat_id = pc.id left join productsubcategories as psc on pp.sub_cat_id = psc.id  left join products as p on p.id = pp.p_id" )
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


  // try {
  //   const res = await getConnection().select("*").from("productpoints");
  //   result(null, res);
  // } catch (error) {
  //   console.log("error: ", error);
  //   result(null, error);
  // }
  return;
};

ProductPoints.updateById = async (id, ProductPoints, result) => {
  // console.log(ProductPoints);

  try {
    const res = await getConnection()
      .from("productpoints")
      .update(ProductPoints)
      .where({ id });

    if (res == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(res);

    result(null, { id: id, ...ProductPoints });
    return;
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

ProductPoints.remove = async (id, result) => {
  try {
    const res = await getConnection()
      .from("productpoints")
      .del()
      .where({ id });
    console.log(res);
    if (res == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted productpoints with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

ProductPoints.removeAll = async (result) => {
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

module.exports = ProductPoints;
