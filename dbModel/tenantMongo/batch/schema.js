const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batch = new Schema(
  {
    name: {
      type: String
    },
    timestamps: true
  }
);

batch.index({
  batchId: 1
});

module.exports = mongoose.model("Batch", batch);
