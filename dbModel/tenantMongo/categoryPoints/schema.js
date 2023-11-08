const { Double, Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryPoints = new Schema(
  {
    cId: {
      type: Number,
      require:true
    },
    subCId: {
      type: Number,
      require:true
    },
    cPoints: {
      type: Double,
      require:true
    },
    cStatus: {
      type: Boolean,
      require:true
    },
    cStartDate: {
      type: Timestamp,
      require:true
    },
    cEndDate: {
      type: Timestamp,
      require:true
    },
    cUserTypes: {
      type: Array,
      require:true
    },
    createdBy: {
      type: mongoose.ObjectId,
      require:true
    },
    timestamps: true
  }
);

categoryPoints.index({
  categoryPointsId: 1
});

module.exports = mongoose.model("CategoryPoints", categoryPoints);
