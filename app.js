const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgroundSchema=new mongoose.Schema({
        name: String,
        image: String,
        description: String
});


var Campground = mongoose.model("Campground",campgroundSchema);

Campground.create(
        {
                name:"camp 2",
                image:"https://media-cdn.tripadvisor.com/media/vr-splice-j/07/3b/86/f3.jpg",
                description:"This is very beautiful and classic campground."        
        },function(err,campground){
                if(err)
                        console.log("Something Went Wrong!!!");
                else{
                        console.log("Added Object:");
                        console.log(campground);
                }
        }       
);
/*
 var campgrounds=[
        {name:"camp 1",image:"https://www.travelbirbilling.com/wp-content/uploads/Bir-Billing4.jpg"},
        {name:"camp 2",image:"https://media-cdn.tripadvisor.com/media/vr-splice-j/07/3b/86/f3.jpg"},
        {name:"camp 3",image:"https://www.travelbirbilling.com/wp-content/uploads/camp-Oak-View.jpg"}
        ];
*/
app.get("/",function(req,res){
        res.render('landing');
});

app.post("/campgrounds",function(req,res){
        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var newcamp = {name:name, image:image, description:desc};
        
        Campground.create(newcamp, function(err,camp){
                if(err)
                {
                        console.log(err);
                }
                else
                {
                        res.redirect("/campgrounds");                
                }
        });
});

app.get("/campgrounds/new",function(req,res){
        res.render("newcamp");
});

app.get("/campgrounds",function(req,res){
        //get all campgrounds from db
        Campground.find({},function(err,campgrounds){
                if(err)
                {
                        console.log(err);
                }
                else{
                     res.render("campgrounds",{campgrounds:campgrounds});   
                }
        });
        
});

app.get("/campgrounds/:id",function(req,res){
        var campid = req.params.id;
        Campground.findById(campid,function(err,showcamp){
                if(err)
                {
                        console.log(err);
                }
                else
                {
                       res.render("show",{showcamp:showcamp}); 
                }
        });
        
});

app.listen(3000,function(){
        console.log("YelpCamp server has started!");
});
