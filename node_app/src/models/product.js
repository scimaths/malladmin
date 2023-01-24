const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    productID : { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    aisle: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    category: { type: String, required: false },
    shopID: { type: Number, required: false },
  },
  { collection: "product", timestamps: true }
);

const model = mongoose.model("ProductSchema", ProductSchema);

module.exports = model;