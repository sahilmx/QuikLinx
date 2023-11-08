const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const industrySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    users: {
      type: Array,
      trim: true,
      unique: true,
      required: true
    }
  },
  {
    // toJSON: {
    //   virtuals: true
    // },
    // toObject: {
    //   virtuals: true
    // },
    timestamps: true
  }
);

industrySchema.index({
  industryId: 1
});

module.exports = mongoose.model("Industry", industrySchema);
