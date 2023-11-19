
const BASE_DB_URI= "mongodb://localhost:27017";

const getAll = async adminDbConnection => {
  try {
    const Partner = await adminDbConnection.model("Partner");
    const partners = await Partner.find({});
    console.log("getAllPartners partners", partners);
    return partners;
  } catch (error) {
    console.log("getAllpartners error", error);
    throw error;
  }
};

const checkPresent = async (adminDbConnection, partner) => {
  try {
    // partner will be a unique property , ex 
    // pEmail:"somerandomemail@test.com"
    const Partner = await adminDbConnection.model("Partner");
    const partners = await Partner.find({ partner });
    console.log("checkPresent partners", partners);
    return partners;
  } catch (error) {
    console.log("checkPresent error", error);
    throw error;
  }
};
const countAll = async (adminDbConnection) => {
  try {
    // partner will be a unique property , ex 
    // pEmail:"somerandomemail@test.com"
    const Partner = await adminDbConnection.model("Partner");
    const partners = await Partner.count();
    console.log("countPartners ", partners);
    return partners;
  } catch (error) {
    console.log("countPartners error", error);
    throw error;
  }
};



const getOne = async (adminDbConnection, req) => {
  try {
    let email = req.pEmail;
    const Partner = await adminDbConnection.model("Partner");
    const partners = await Partner.findOne({ email });

    console.log({ partners });
    return partners;
  } catch (error) {
    console.log("getAllpartners error", error);
    throw error;
  }
};

const remove = async (adminDbConnection, prop) => {
  try {

    //prop will be a property to search and delete the record 

    const Partner = await adminDbConnection.model("Partner");
    const partners = await Partner.deleteOne({ prop });

    console.log({ partners });
    return partners;
  } catch (error) {
    console.log("getAllpartners error", error);
    throw error;
  }
};


const removeAll = async (adminDbConnection,prop) => {
  try {

    //prop will be a property to search and delete the records if null it will delete all the records 

    const Partner = await adminDbConnection.model("Partner");
    const partners = await Partner.deleteMany({ prop });

    console.log({ partners });
    return partners;
  } catch (error) {
    console.log("getAllpartners error", error);
    throw error;
  }
};


const findById = async (adminDbConnection, req) => {
  try {
    console.log("this is the findbyid of the vendor ", req.params.id)
    const Partner = await adminDbConnection.model("Partner");
    const partners = await Partner.findOne({ "_id": req.params.id });
    return partners;
  } catch (error) {
    console.log("getAllpartners error", error);
    throw error;
  }
};

const create = async (adminDbConnection, body) => {

  try {

    console.log("body in create admin ", body);
    const Partner = await adminDbConnection.model("Partner");
    const email = body.pEmail;
    const PartnerPresent = await Partner.findOne({
      email
    });
    if (PartnerPresent) {
      throw new Error("Partner Already Present");
    }
    const newPartner = await new Partner({
      ...body
    }).save();
    const name = body.pName;
    const newTenantDB = await new Tenant({
      name,
      dbURI: `${BASE_DB_URI}/mt_${name}`,
      "tPhone":body.tPhone,
      "tPass":body.tPass,
      "tEmail":body.tEmail
    }).save();
    return newPartner;
  } catch (error) {
    console.log("createPartner error", error);
    throw error;
  }
};


const updatePartner = async (adminDbConnection, req, values) => { 

  delete values.id;
  try {

    const Partner = await adminDbConnection.model("Partner");
    var filter ={_id:"ObjectId("+req.id+"+)"}
    var filter = { address: "Valley 345" };
    var newvalues = { $set: {...values} };
    console.log({values});

    const updatePartner = await Partner.updateOne({ filter, newvalues}, (err, collection) => {
      if (err) throw err;
      console.log("Record updated successfully");
      console.log({collection});
    });

    return updatePartner;
  } catch (error) {
    console.log("updatePartner error", error);
    throw error;
  }
};





module.exports = { getAllPartners: getAll, createPartner: create, getPartner: getOne, updatePartner, findById ,checkPresent,countAll,remove,removeAll};
