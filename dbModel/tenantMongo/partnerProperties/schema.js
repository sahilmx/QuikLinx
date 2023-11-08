const { Double } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partnerPropertiesSchema = new Schema(
  {
    name: {
      type: String
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    socials: {
      type: Object,
      required: true
    },
    website: {
      type: String,
      required: true
    },
    address: {
      type: Object,
      required: true
    },
    businessDetails: {
      type: Object,
      required: true
    },
    themeSettings: {
      type: Object,
      required: true
    }, 
    pointConvrsion: {
      type: Double,
      required: true
    },
    priceConversion: {
      type: Double,
      required: true
    },
  },
  // TODO: find out what these 2 options do
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    timestamps: true
  }
);

partnerPropertiesSchema.index({
  partnerPropId: 1
});

module.exports = mongoose.model("PartnerProperties", partnerPropertiesSchema);
