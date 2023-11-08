const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diftRedemptionSchema = new Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      require:true
    },
    userRole: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    refNo: {
      type: String,
      trim: true
    },
    gifts: {
      type: Object,
      required: true
    },
    pointsUsed: {
      type: Double,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    location: {
      type: Location,
      required: true
    }
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

diftRedemptionSchema.index({
  userId: 1
});

module.exports = mongoose.model("GiftRedemption", diftRedemptionSchema);
