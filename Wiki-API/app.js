const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article",articleSchema);


//////////// Request Target All Articles.
app.route("/articles")
.get(function(req,res){
  Article.find({},function(err,foundArticles){
    if(!err){
      res.send(foundArticles);
    } else{
      res.send(err);
    }
  });
})
.post(function(req,res){
  console.log(req.body.title);
  console.log(req.body.content);
  const newArticle = new Article({
    title:req.body.title,
    content:req.body.content
  });
  newArticle.save(function(err){
    if(!err){
      res.send("Successfully added a new article");
    } else {
      res.send(err);
    }
  });

})
.delete(function(req,res){
  Article.deleteMany({},function(err){
    if(err){
      res.send(err);
    } else{
      res.send("Deleted Successfully");
    }
  });
});
////////// Request Target specific Article.
app.route("/articles/:articleTitle")
.get(function(req,res){

  Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
    if(err){
      req.send(err);
    } else {
      if(foundArticle){
        res.send(foundArticle);
      } else{
        res.send("No articles mathing this title !!! ");
      }
    }
  });
})

.put(function(req,res){
  Article.update(
    {title:req.params.articleTitle},
    {title:req.body.title, content:req.body.content},
    {overwite: true},function(err,result){
      if(err){
        res.send(err);
      } else{
        res.send("Successfully update article.");
      }
  });
})

.patch(function(req,res){
  Article.update(
    {title:req.params.articleTitle},
    {$set: req.body},
    function(err,result){
      if(err){
        res.send(err);
      } else {
        res.send("Successfully update article.")
      }
  });
})

.delete(function(req,res){
  Article.deleteOne({title:req.params.articleTitle},function(err){
    if(err){
      res.send(err);
    } else {
      res.send("deleted Successfully");
    }
  });
});


app.listen(3000,function(){
  console.log("server started on port 3000");
})
