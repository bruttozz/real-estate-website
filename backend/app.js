const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const assert = require('assert');

const PostModel = require('./models/post');

const app = express();
const router = express.Router();

// var url = 'mongodb://localhost:27017/test';
//
// router.get('/', function (req, res, next) {
//   res.render('index');
// });
//
// router.get('/get-data', function (req, res, next) {
//   var resultArray = [];
//   mongo.connect(url, function (err, db) {
//     assert.equal(null, err);
//     var cursor = db.collection('user-data').find();
//     cursor.forEach(function(doc, err) {
//       resultArray.push(doc);
//     }, function doSth() {
//       db.close();
//       res.render('index', {items: resultArray});
//     });
//   })
// });
//
// router.post('/insert', function (req, res, next) {
//   var item = {
//     title: req.body.title,
//     content: req.body.content
//   };
//
//   mongo.connect(url, function (err, db) {
//     assert.equal(null, err);
//     db.collection('user-data').insertOne(item, function (err, result) {
//       assert.equal(null, error);
//       console.log('Item Inserted');
//       db.close();
//     });
//   });
//
// });

mongoose.connect("mongodb+srv://test:lclc0610@bruttocluster-p4qft.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(() => {
    console.log('Connection Failed')
  });

// mongoose.connection.once('open', function() {
//   logger.info('MongoDB event open');
//   logger.debug('MongoDB connected [%s]', url);
//
//   mongoose.connection.on('connected', function() {
//     logger.info('MongoDB event connected');
//   });
//
//   mongoose.connection.on('disconnected', function() {
//     logger.warn('MongoDB event disconnected');
//   });
//
//   mongoose.connection.on('reconnected', function() {
//     logger.info('MongoDB event reconnected');
//   });
//
//   mongoose.connection.on('error', function(err) {
//     logger.error('MongoDB event error: ' + err);
//   });
//
//   // return resolve();
//   return server.start();
// });
//
// mongoose.connect("mongodb+srv://test:lclc0610@bruttocluster-p4qft.mongodb.net/admin?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
//   if (err) {
//     logger.error('MongoDB connection error: ' + err);
//     // return reject(err);
//     process.exit(1);
//   }
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested_With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("api/posts", (req, res, next) => {
  const post = new PostModel({
    title: req.body.title,
    content: req.body.content
  });
  post.save();

  console.log(post);
  res.status(201).json({message: "Post added successfully"});
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {id: "01", title: "one", content: "oneone"},
    {id: "02", title: "two", content: "twotwo"}
  ];
  PostModel.find().then(documents => {
    console.log(documents);
  });

  res.status(200).json({
    message: "Posts fetched successfully",
    posts: posts
  });
});

module.exports = app;
