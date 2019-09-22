const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested_With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("./api/posts", (req, res, next) => {
  const post = req.body;

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

// app.use((req, res, next) => {
//   res.send("Hello from express");
// })

module.exports = app;
