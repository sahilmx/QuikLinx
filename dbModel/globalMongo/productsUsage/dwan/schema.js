const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dwan = new Schema(
  {
    pId: {
      type: mongoose.ObjectId,
      require:true
    },
    options: {
      type: Object,
      require:true
    },
    timestamps: true
  }
);

dwan.index({
  dwanId: 1
});

module.exports = mongoose.model("Dwan", dwan);
