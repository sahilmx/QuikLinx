const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partnerSchema = new Schema(
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
    pGstin:{
      type:String,
      trim:true,
    },
    pPanelStatus:{
      type:Boolean,
      trim:true,
      required:false
    },
    pQrType:{
      type:Number,
      trim:true,
      required:true
    },
    pContactPerson:{
      type:String,
      trim:true,
      required:true
    },
    pContactPersonNumber:{
      type:Number,
      trim:true,
      required:true
    },
    pUserRequirement:{
      type:Number,
      trim:true,
      required:true
    },
    pDemoValue:{
      type:Number,
      trim:true,
      required:true
    },

    pSlug:{
      type:String,
      trim:true,
      required:false
    },
    pSupportDetails:{
      type:Object,
      trim:true,
      required:false
    },
    deleted:{
      type:Boolean,
      trim:true,
      required:true
    },
    pUserTypes:{
      type:Object,
      trim:true,
      required:false
    },
    pProductsOpted:{
      type:Object,
      trim:false
    },
    pGeneralSettings:{
      type:Object,
      trim:false
    },
    logo:{
      type:Object,
      trim:false
    },
    
  },
  {
    timestamps: true
  }
);

partnerSchema.index({
  tenantId: 1
});

module.exports = mongoose.model("Partner", partnerSchema);
