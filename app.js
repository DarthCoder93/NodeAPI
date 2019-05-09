var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
const config = require('./config/config')

var admin = require("firebase-admin");
//path to the service account json file
var serviceAccount = require("./serviceAccountKey.json");
//initialize firebase admin sdk with service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://apiproject-c7a88.firebaseio.com",
  storageBucket: "apiproject-c7a88.appspot.com"
});

var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var brandRouter = require('./routes/brands')
var orderRouter = require('./routes/order')

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect(config.databaseConnnectionString, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongodb")
});


app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/brands', brandRouter);
app.use('/orders', orderRouter);

module.exports = app;
