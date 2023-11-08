const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genuinemark = new Schema(
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

genuinemark.index({
  Id: 1
});

module.exports = mongoose.model("GenuineMark", genuinemark);
