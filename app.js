var express = require('express');

var app = express();

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/restdb");

app.set("view engine", "ejs");
var campSchema  = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
})

var Camps = mongoose.model("Camp", campSchema);

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs", function(req, res){
    
    Camps.find({}, function(err, campsFound){
        if (err){
            console.log(err);
        }
        else {
             res.render("home", {camps: campsFound});
        }
    })
   
})

app.get("/blogs/new", function(req, res){
    res.render("addpost.ejs")
})

app.post("/blogs", function(req, res){
    Camps.create(req.body.camp, function(err, addedCamp){
        if (err){
            console.log(err);
        }
        else {
            res.redirect("/blogs")
        }
    })
})

app.get("/blogs/:id",function(req, res){
    Camps.findById(req.params.id, function(err, foundBlog){
        res.render("detailview", {blog: foundBlog})
    })
})

app.post("/addcamp", function(req, res){
    
    Camps.create(req.body.camp);
         res.redirect("viewcamps")
    })
   


app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Rest server started!!");
})