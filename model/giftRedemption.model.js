const { getConnection } = require("../utils/connectionManager"); // tenant specific connection manager

// constructor
const GiftRedemption = function (giftRedemption) {
  this.user_id = giftRedemption.user_id;
  this.user_role = giftRedemption.user_role;
  this.ref_no = giftRedemption.ref_no;
  this.gifts = giftRedemption.gifts;
  this.points_used = giftRedemption.points_used;
  this.status = giftRedemption.status;
  this.location= giftRedemption.location;
  this.created_on = giftRedemption.created_on;
  this.updated_on = giftRedemption.updated_on;
};

GiftRedemption.create = async (giftRedemption, result) => {
  try {
    console.log({ giftRedemption });
    const userData = await getConnection()
      .select("*")
      .from("vendor_users")
      .where("id", giftRedemption.user_id);
    if (userData[0].user_role != giftRedemption.user_role) {
      result("Gift Redemption is not allowed for this user  ", { id: 0 });
    } else if (userData[0].points < giftRedemption.points_used) {
      result("Insufficient Points with user ", { id: 0 });
    } else {
      await getConnection().raw(
        `update vendor_users set points = points - ${giftRedemption.points_used} where id = ${giftRedemption.user_id}`,
      );
      
      const res = await getConnection()
        .insert(giftRedemption)
        .into("gift_redemption")
        .returning("id");
      console.log(userData[0]);
      result(null, { id: res[0].id, ...giftRedemption });
      //result(null, { id: 0, ...giftRedemption });
    }
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  return;
};

GiftRedemption.findById = async (id, result) => {
  try {
    const res = await getConnection()
      .select("*")
      .from("gift_redemption")
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

GiftRedemption.getAll = async (result) => {
  try {
   //  select gr.* , vu.u_name , vu.u_mobile , vu.u_address,g.g_price from gift_redemption as gr join vendor_users vu on gr.user_id = vu.id left join gifts as g on g.id =  (gr.gifts ->> 'gift_id'):: INT  ;

    const res = await getConnection().raw(`select gr.* , vu.u_name , vu.u_mobile , vu.u_address ,g.g_price from gift_redemption as gr join vendor_users vu on gr.user_id = vu.id left join gifts as g on g.id =  (gr.gifts ->> 'gift_id'):: INT`);
   // const res = await getConnection().select("*").from("gift_redemption");
    result(null, res.rows);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    
  }
  return;
};

GiftRedemption.updateById = async (id, GiftRedemption, result) => {
  // console.log(GiftRedemption);

  try {
    const res = await getConnection()
      .from("gift_redemption")
      .update(GiftRedemption)
      .where({ id });

    if (res == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(res);

    result(null, { id: id, ...GiftRedemption });
    return;
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

GiftRedemption.remove = async (id, result) => {
  try {
    const res = await getConnection()
      .from("gift_redemption")
      .del()
      .where({ id });
    console.log(res);
    if (res == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted gift_redemption with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

GiftRedemption.removeAll = async (result) => {
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

module.exports = GiftRedemption;
