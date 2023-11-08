const { getConnection } = require("../utils/connectionManager");




// constructor

const Gifts = function(gift) {
  this.g_brand = gift.g_brand;
  this.g_name = gift.g_name;
  this.g_value = gift.g_value;
  this.g_price = gift.g_price;
  this.g_image = gift.g_image;
  this.user_type = gift.user_type;
  this.status = gift.status;
  this.created_on = gift.created_on;
  this.updated_on = gift.updated_on;
};




Gifts.create =  async (newQr,slug, result) => {

  //console.log({pp})
    try {

      console.log({newQr});
     
      const res = await getConnection(slug).insert(newQr).into("gifts").returning('id');    
      
      
      result(null, {  res:res[0].id, ...newQr });
 
    } catch (error) {
      console.log(error);
    result(null, error);
      
    }
    return;

  
};



Gifts.findById = async(id, result) => {

  try {
    const res = await getConnection().select('*').from('gifts').where('id',id);
    console.log(res);
    result(null, res);
    return;
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  
};

Gifts.getAll = async (title, result) => {


  try {
    const res = await getConnection().select("*").from("gifts");
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
  }
  return;
};



Gifts.updateById = async (id, gift,slug, result) => {
  try {
    const res = await getConnection(slug)
      .from("gifts")
      .update(gift)
      .where({ id });

    if (res == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(res);

    result(null, { id: id, ...gift });
    return;
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

Gifts.remove = async (id, result) => {
  try {
    const res = await getConnection()
      .from("gifts")
      .del()
      .where({ id });
    console.log(res);
    if (res == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted gifts with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }

};

Gifts.removeAll = async result => {
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

module.exports = Gifts;

