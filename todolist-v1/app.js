const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
//const date = require(__dirname + "/date.js");
const app = express();




app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb+srv://admin-abdulmalik:03690369@cluster0.rdwsa.mongodb.net/todolistDB",{useNewUrlParser: true});

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item ({
  name: "Welcome "
});

const item2 = new Item({
  name:"Hit the + button to add new item"
});
const item3 = new Item({
  name:"<-- Hit this to delete item."
});

const defualtItems = [item1,item2,item3];

const listSchema = {
  name:String,
  items: [itemsSchema]
};

const List = mongoose.model("List",listSchema);



app.get("/",function(req,res){
//  let day = date.getDate();

Item.find({}, function(err,foundItems){

  if(foundItems.length ===0){
    Item.insertMany(defualtItems,function(err){
      if(err){
        console.log(err);

      }else{
        console.log("successfuly added insertMany()");
      }
    });
    res.redirect("/");
  } else{
    res.render("list",{listTitle : "Today", toDoItems: foundItems});
  }

})

});

app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err,foundList){
    if(!err){
      if(!foundList){
        //create new Lsit
        const list = new List({
          name: customListName,
          items: defualtItems
        });
        list.save();
        res.redirect("/"+customListName);
      } else{
        //Shows an existed list
        res.render("list",{listTitle : foundList.name, toDoItems: foundList.items});
      }

    }
  });
})


app.post("/",function(req,res){
  //console.log(req.body);
  let itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name:itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  } else{
    List.findOne({name: listName}, function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    });
  }
});

app.post("/delete", function(req,res){
  const checkItemId=req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkItemId,function(err){
      if(err){
        console.log(err);
      } else{
        console.log("Detleted successfuly !");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name:listName},{$pull: {items:{_id:checkItemId}}},function(err,foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }

});




// app.post("/work",function(req,res){
//   let item = req.body.newItem;
//   workToDo.push(item);
//   console.log(workToDo);
//   res.redirect("/work");
// });

app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000,function(){
  console.log("server started on port 3000");
})
