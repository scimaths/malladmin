const Product = require("../models/product");
exports.products = async () => {
    const products = await Product.find();
    return products;
};
exports.productById = async id => {
    const product = await Product.findOne({ id: id })
    return product;
}
exports.productEdit = async payload => {
    // edit product
    const product = await Product.findOneAndUpdate({ id: payload.id }, payload)
}
exports.addProduct = async payload => {
    const newProduct = await Product.create(payload);
    return newProduct
}
exports.removeProduct = async id => {
    const product = await Product.findOneAndDelete({ id: id })
    return product
}