const sql = require("../DB/db_connection").con;
const pool = require('../DB/db_connection').pool;
const { getConnection } = require("../utils/connectionManager");




// constructor

const Qr = function(qr_code) {
  this.batch_id = qr_code.batch_id;
  this.qr_count = qr_code.qr_count;
  this.product_id = qr_code.product_id;
  this.creation = qr_code.creation;
};




//   +------------+-
// | Field      | 
// +------------+-
// | id         | 
// | batch_id   | 
// | qr_count   | 
// | product_id | 
// | creation   | 
// +------------+-




Qr.create =  async (newQr) => {
console.log(
  "inside qr code model "
);

    try {

      const res = await getConnection().insert(newQr).into("qrcodehistory").returning('id');     
    //  result(null, {  res:res[0].id, ...newQr });
      console.log(
       "inserted qr code ", res[0]
      );
      return{
        success:true,
        res:res[0].id,...newQr
      }
    } catch (error) {
      throw error;
      
     // result(null, error);


      console.log("QR Code history ",error);
    }
    return;

  
  pool.get_connection((qb) => {
    qb.returning("id")
      .insert("qrCodeHistory", newQr)
      .then((res) => {
        console.log("created qrCodeHistory: ", {
          id: res.insertId,
          ...newQr,
        });
        result(null, { id: res.insertId, ...newQr });
      })
      .catch((err) => {
        qb.release();
        console.log("error: ", err);
        result(err, null);
        return;
      });
    });


  //  sql.query("INSERT INTO qr_code SET ?", newQr, (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }

  //   console.log("created qr_code: ", { id: res.insertId, ...newQr });
  //   result(null, { id: res.insertId, ...newQr });
  // });
};



Qr.findById = async(id, result) => {

  try {
    const res = await getConnection().select('*').from('qr_code').where('qrh_id',id);
    console.log(res);
    result(null, res);
    return;
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  
};

Qr.getAll = (title, result) => {


  
  const res = getConnection()
  .raw(
    " select qrh.id , qrh.creation , qrh.batch_id , qrh.product_id ,qrh.qr_count ,  p.p_name , b.b_name from qrCodeHistory as qrh left join products as p on p.id = qrh.product_id left join batch b on b.id = qrh.batch_id")
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
};



Qr.updateById = (id, qr_code, result) => {
  sql.query(
    "UPDATE qr_code SET title = ?, description = ?, published = ? WHERE id = ?",
    [qr_code.title, qr_code.description, qr_code.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found qr_code with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated qr_code: ", { id: id, ...qr_code });
      result(null, { id: id, ...qr_code });
    }
  );
};

Qr.remove = (id, result) => {
  sql.query("DELETE FROM qr_code WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found qr_code with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted qr_code with id: ", id);
    result(null, res);
  });
};

Qr.removeAll = result => {
  sql.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} qr_code`);
    result(null, res);
  });
};

module.exports = Qr;

