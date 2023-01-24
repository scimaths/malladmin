const mongoose = require("mongoose");

const MallSchema = new mongoose.Schema(
  {
    mallID: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    location: {type: String, required: true},
  },
  { collection: "mall", timestamps: true }
);

const model = mongoose.model("MallSchema", MallSchema);

module.exports = model;