const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    pName: {
      type: String,
      unique: true,
      required: true
    },
    pSocials: {
      type: Object,
      trim: true,
    },
    pEmail:{
      type:String,
      trim:true,
      required:true
    },
    pPassword:{
      type:String,
      trim:true,
      required:true
    },
    pPhone:{
      type:String,
      trim:true,
      required:true
    },
    pWebsite:{
      type:String,
      trim:true,
      required:true
    },
    pAddress:{
      type:Object,
      trim:true,
      required:true
    },
    pBusinessDetails:{
      type:Object,
      trim:true,
    },
    PId:{
      type:Number,
      trim:true,
      required:true
    },
    pSlug:{
      type:String,
      trim:true,
      required:true
    },
    pSupportDetails:{
      type:Object,
      trim:true,
      required:true
    },
    deleted:{
      type:Boolean,
      trim:true,
      required:true
    },
    pUserTypes:{
      type:Object,
      trim:true,
      required:true
    },
    pProductsOpted:{
      type,Object,
      trim:true
    },
    pGeneralSettings:{
      type,Object,
      trim:true
    }
  },
  {
    timestamps: true
  }
);

tenantSchema.index({
  tenantId: 1
});

module.exports = mongoose.model("Tenant", tenantSchema);
