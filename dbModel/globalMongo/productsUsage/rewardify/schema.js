const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardify = new Schema(
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

rewardify.index({
  Id: 1
});

module.exports = mongoose.model("Rewardify", rewardify);
