const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://vaibhavvaibhav2:vaibhavvaibhav@cluster0.9dhctck.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true },() => console.log("Mongoose is connected"));

const Product = require("./models/product");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/files', express.static("files"));
app.use(morgan('dev'));
app.use(cors());
require('./routeHandler')(app)

app.get('/', (req, res) => {
    res.json({
        message: 'Arise MERN developers'
    });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});