const productRepository = require('./repository')
const Math = require('mathjs')
exports.addProduct = async (req, res) => {
    try {
        // var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");
        // require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
        // console.log(err);
        // });
        // console.log(req.)
        let payload = {
            name: req.body.name,
            price: req.body.price,
            productID : req.body.productID,
            description: req.body.description,
            quantity: req.body.quantity,
            aisle: req.body.aisle,
            image: req.body.image,
        }
        let product = await productRepository.addProduct({
            ...payload});
        res.status(200).json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        let products = await productRepository.products();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}

exports.increaseStock = async (req, res) => {
    try {
        let id = req.params.id
        let quantity = req.body.quantity
        let productDetails = await productRepository.increaseStock(id, quantity);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.productById(id);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.removeProduct = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.removeProduct(id)
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.nextID = async (req, res) => {
    try {
        let found = false;
        while(!found){
            id = Math.floor(Math.random() * 1000000000)
            let productDetails = await productRepository.productById(id)
            if (!productDetails) {
                found = true;
            }
        }
        console.log(id)
        res.status(200).json({
            status: true,
            data: id
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}