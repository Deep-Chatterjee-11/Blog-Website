//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "This Blogging was made by Deep Jyoti Chatterjee. A 2nd year student at National Institute of Technology, Durgapur (NIT-DGP).";
const contactContent = "Reach out to me at deepchatterjee0360@gmail.com";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){  
  res.render("home", { startingContent: homeStartingContent, newPostItem: posts});
});

app.get("/about", function(req, res){
  res.render("about", {about_Content: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contact_Content: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  for(var i=0; i<posts.length; i++){
    if(_.lowerCase(posts[i].title) === requestedTitle){
      console.log("Match found!");
      res.render("post", {titles: posts[i].title, contents: posts[i].content});
    }
  }
});

app.post("/compose", function(req, res){

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});


