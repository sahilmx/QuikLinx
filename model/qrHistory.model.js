const sql = require("../DB/db_connection").con;
const pool = require('../DB/db_connection').pool;
const  {getConnection}  = require('../utils/connectionManager');



// const Qr = function(qr_code) {
//   this.batch_id = qr_code.batch_id;
//   this.qr_count = qr_code.qr_count;
//   this.product_id = qr_code.product_id;
//   this.creation = qr_code.creation;
// };

const Qr = function(qr_code) {
  this.qr_type = qr_code.qr_type;
  this.b_id = qr_code.b_id;
  this.qr_parent_id = qr_code.qr_parent_id;
  this.qr_creation = qr_code.qr_creation;
  this.unique_id=qr_code.unique_id;
  this.qrh_id=qr_code.qrh_id;
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


Qr.generateQr= async (newQr, result)=>{
  console.log("asdfg",{newQr});


  try {
    const res = await getConnection().insert(newQr).into("qr_code").returning('id');
    console.log("Generate qrcode ",res[0].id)
    result(null, { id: res[0].id, ...newQr });
  } catch (error) {
    result(null, error);
    console.log("Generate qrcode error ",error)

  }
  return;




  pool.get_connection((qb) => {
    qb.returning("id")
      .insert("qr_code", newQr)
      .then((res) => {
        qb.release();
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
  

};

Qr.create =  (newQr, result) => {

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

Qr.findById = (id, result) => {
  sql.query(`SELECT * FROM qr_code WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found qr_code: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found qr_code with the id
    result({ kind: "not_found" }, null);
  });
};

Qr.getAll = (title, result) => {



  pool.get_connection((qb) => {

    qb.select('qrh.id , qrh.creation , qrh.batch_id , qrh.product_id ,qrh.qr_count ,  p.p_name , b.b_name ').from('qrCodeHistory qrh')
    .join('products p', 'p.id = qrh.product_id', 'left').join('batch b', 'b.id = qrh.batch_id', 'left')
    .get((err,response)=>{
      qb.disconnect();
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (response.length) {
        console.log("found Generated Qr's : ", response);
        result(null, response);
        return;
      }
       
        // SELECT `name`, `position` FROM `planets` WHERE `type` = 'rocky' AND `diameter` < 12000
        console.log("Query Ran: " + qb.last_query());

        // [{name: 'Mercury', position: 1}, {name: 'Mars', position: 4}]
        console.log("Results:", response);

        result({ kind: "not_found" }, null);
    });
  });

  // let query = "SELECT * FROM qrCodeHistory";

  // if (title) {
  //   query += ` WHERE title LIKE '%${title}%'`;
  // }

  // sql.query(query, (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(null, err);
  //     return;
  //   }

  //   console.log("products: ", res);
  //   result(null, res);
  // });
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

