const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dynamicFormsSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    industry: {
      type: mongoose.ObjectId,
      unique: true
    },
    type: {
      type: String,
      unique: true,
      required: true
    },
    defination: {
      type: Object,
      unique: true,
    }
  },
  {
    timestamps: true
  }
);

dynamicFormsSchema.index({
  dynamicFormId: 1
});

module.exports = mongoose.model("DynamicFroms", dynamicFormsSchema);
