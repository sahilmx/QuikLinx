const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
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
    password: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true
    },
    isValid: {
      type: Boolean,
      required: false,
      default:true
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

adminSchema.index({
  userId: 1
});

module.exports = mongoose.model("Admin", adminSchema);
