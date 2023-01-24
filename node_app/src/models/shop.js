const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ShopSchema = new mongoose.Schema(
  {
    shopID: {type: Number, required: true},
    name: {type: String, required: true},
    floor: {type: Number, required: true},
    mall: {type: Schema.Types.ObjectId, ref: "MallSchema", required: true},
  },
  { collection: "shop", timestamps: true }
);

const model = mongoose.model("ShopSchema", ShopSchema);

module.exports = model;