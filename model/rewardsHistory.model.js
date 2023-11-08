const { getConnection } = require("../utils/connectionManager");




// constructor

const RewardifyHistory = function(reward_history) {
  this.user_id = reward_history.user_id;
  this.user_type = reward_history.user_type;
  this.latitude = reward_history.latitude;
  this.longitude = reward_history.longitude;
  this.qrcode_id = reward_history.qrcode_id;
  this.scan_type = reward_history.scan_type;
  this.platform = reward_history.platform;
  this.name = reward_history.name;
  this.created_on = reward_history.created_on;
};



RewardifyHistory.create =  async (newQr,pp, result) => {

  console.log({pp})
    try {

      console.log({newQr});
      //delete newQr.product_points;
      const query = await getConnection().raw(`update vendor_users set points = points + ${pp} where id = ${newQr.user_id}`);
      console.log({query});
      await getConnection().raw(`update qr_code set redeemed = true where id = ${newQr.qrcode_id}`);
      const res = await getConnection().insert(newQr).into("qrcode_scan_history").returning('id');    
      
      
      result(null, {  res:res[0].id, ...newQr });
 
      // return{
      //   success:true,
      //   res:res[0].id,...newQr
      // }
    } catch (error) {
      //throw error;
      console.log(error);
     result(null, error);
      
    }
    return;

  
};



RewardifyHistory.findById = async(id, result) => {

  try {
    const res = await getConnection().select('*').from('qrcode_scan_history').where('qrh_id',id);
    console.log(res);
    result(null, res);
    return;
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  
};

RewardifyHistory.getAll = (title, result) => {


  
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



RewardifyHistory.updateById = (id, reward_history, result) => {
  sql.query(
    "UPDATE reward_history SET title = ?, description = ?, published = ? WHERE id = ?",
    [reward_history.title, reward_history.description, reward_history.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found reward_history with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated reward_history: ", { id: id, ...reward_history });
      result(null, { id: id, ...reward_history });
    }
  );
};

RewardifyHistory.remove = (id, result) => {
  sql.query("DELETE FROM reward_history WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found reward_history with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted reward_history with id: ", id);
    result(null, res);
  });
};

RewardifyHistory.removeAll = result => {
  sql.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} reward_history`);
    result(null, res);
  });
};

module.exports = RewardifyHistory;

