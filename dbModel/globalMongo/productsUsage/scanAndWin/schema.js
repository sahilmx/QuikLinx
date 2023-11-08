const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scanAndWin = new Schema(
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

scanAndWin.index({
  Id: 1
});

module.exports = mongoose.model("ScanAndWin", scanAndWin);
