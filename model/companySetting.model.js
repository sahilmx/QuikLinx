const { getConnection } = require("../utils/connectionManager"); // tenant specific connection manager

                 
// constructor
const CompanySetting = function (companySetting) {

  this.c_name = companySetting.c_name;
  this.c_email = companySetting.c_email;
  this.socials = companySetting.socials;
  this.c_customer_care_email = companySetting.c_customer_care_email;
  this.c_mobile = companySetting.c_mobile;
  this.c_customer_care_mobile = companySetting.c_customer_care_mobile;
  this.website = companySetting.website;
  this.c_address = companySetting.c_address;
  this.c_gstin = companySetting.c_gstin;
  this.logo=companySetting.logo;
  this.c_theme_colors = companySetting.c_theme_colors;
  this.c_points_value = companySetting.c_points_value;
  this.c_price_value = companySetting.c_price_value;
  this.c_font_family = companySetting.c_font_family;
  this.created_on = companySetting.created_on;
  this.updated_on = companySetting.updated_on;
};

CompanySetting.create = async (companySetting, result) => {
  try {

      const res = await getConnection()
        .insert(companySetting)
        .into("company_profile_local")
        .returning("id");
//      console.log(userData[0]);
      result(null, { id: res[0].id, ...companySetting });
      //result(null, { id: 0, ...companySetting });
    
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
  return;
};

CompanySetting.findById = async (id, result) => {
  try {
    const res = await getConnection()
      .select("*")
      .from("company_profile_local")
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

CompanySetting.getAll = async (result) => {
  try {
   //  select gr.* , vu.u_name , vu.u_mobile , vu.u_address,g.g_price from company_profile_local as gr join vendor_users vu on gr.user_id = vu.id left join gifts as g on g.id =  (gr.gifts ->> 'gift_id'):: INT  ;

    //const res = await getConnection().raw(`select gr.* , vu.u_name , vu.u_mobile , vu.u_address ,g.g_price from company_profile_local as gr join vendor_users vu on gr.user_id = vu.id left join gifts as g on g.id =  (gr.gifts ->> 'gift_id'):: INT`);
    const res = await getConnection().select("*").from("company_profile_local");
    result(null, res);
  }catch (error) {
    console.log("error: ", error);
    result(null, error);
  }
  return;
};

CompanySetting.updateById = async (id, CompanySetting, result) => {
  // console.log(CompanySetting);

  try {
    const res = await getConnection()
      .from("company_profile_local")
      .update(CompanySetting)
      .where({ id });

    if (res == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(res);

    result(null, { id: id, ...CompanySetting });
    return;
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

CompanySetting.remove = async (id, result) => {
  try {
    const res = await getConnection()
      .from("company_profile_local")
      .del()
      .where({ id });
    console.log(res);
    if (res == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted company_profile_local with id: ", id);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

CompanySetting.removeAll = async (result) => {
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

module.exports = CompanySetting;
