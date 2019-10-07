const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PostModel = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://brutto:<password>@bruttocluster-p4qft.mongodb.net/admin?retryWrites=true&w=majority");

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

  console.log(post);
  res.status(201).json({message: "Post added successfully"});
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {id: "01", title: "one", content: "oneone"},
    {id: "02", title: "two", content: "twotwo"}
  ];
  res.status(200).json({
    message: "Posts fetched successfully",
    posts: posts
  });
});

module.exports = app;
